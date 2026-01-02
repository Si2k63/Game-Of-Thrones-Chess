import AbstractBoard from "./AbstractBoard";
import {
  TMoveResult,
  TBoard,
  TCoordinates,
  TPiece,
  TPieceColour,
  TPieceName,
  TSquare,
  TMovementRule,
} from "./Engine.types";

import King from "./pieces/King";
import IsAbleToCastle from "./rules/IsAbleToCastle";
import IsEnemyRule from "./rules/IsEnemyRule";
import IsKingChecked from "./rules/IsKingChecked";
import IsNotMovingIntoCheck from "./rules/IsNotMovingIntoCheck";
import IsNullOrEnemyRule from "./rules/IsNullOrEnemyRule";
import IsNullRule from "./rules/IsNullRule";
import IsObstructed from "./rules/IsObstructed";
import IsPawnAbleToDash from "./rules/IsPawnAbleToDash";
import IsPinned from "./rules/IsPinned";
import IsValidSpaceRule from "./rules/IsValidSpaceRule";

class Board extends AbstractBoard {
  activeColour: TPieceColour = "White";
  taken: TPiece[] = [];

  rules: TMovementRule[] = [
    new IsValidSpaceRule(this),
    new IsPinned(this),
    new IsNullOrEnemyRule(this),
    new IsObstructed(this),
    new IsNotMovingIntoCheck(this),
    new IsKingChecked(this),
    new IsPawnAbleToDash(this),
    new IsNullRule(this),
    new IsEnemyRule(this),
    new IsAbleToCastle(this),
  ];

  /**
   * Resets the board state to a new one.
   *
   * @param board - The new board to replace the current one.
   */
  reset(board: TBoard) {
    this.activeColour = "White";
    this.board = board;
    this.taken = [];
  }


  /**
  * Moves a piece on the board from one coordinate to another.
  *
  * @param from - The piece's current coordinates.
  * @param to - The piece's target coordinates.
  *
  */
  move(from: TCoordinates, to: TCoordinates): TMoveResult {
    super.move(from, to);

    if (this.castleKing(from, to)) {
      this.changeActiveColour();
    }

    return this.checkResult();
  }

  /**
  * Toggles the active colour.
  */
  changeActiveColour(): void {
    this.activeColour = this.activeColour === "White" ? "Black" : "White";
  }

  /**
  * Promotes a qualifying pawn with the chosen replacement piece.
  *
  * @param replacement - The piece to transform the pawn into.
  */
  promote(replacement: TPiece): void {
    for (const { piece, rowIndex, columnIndex } of this.getPieces()) {
      if ([0, this.board.length - 1].includes(rowIndex) === false) {
        continue;
      }

      // already switched after completion of move.
      if (piece.colour === this.activeColour) {
        continue;
      }

      if (piece.name !== "Pawn") {
        continue;
      }

      this.board[rowIndex][columnIndex] = replacement;
    }
  }

  /**
   * Checks whether the active player has any pawn which can promote.
   *
   * @returns True if the player has a promotable pawn.
   */
  canPromote(): boolean {
    for (const { rowIndex, piece } of this.getPieces()) {
      if ([0, this.board.length - 1].includes(rowIndex) === false) {
        continue;
      }

      if (piece.colour !== this.activeColour && piece.name === "Pawn") {
        return true;
      }
    }

    return false;
  }

  /**
  * Generates the result of a movement, checking for things like whether pieces can promote, or whether a move has resulted in checkmate.
  *
  * @returns The move result describing the state of the game.
  */
  checkResult(): TMoveResult {
    this.changeActiveColour();
    const result = {
      checkmate: this.isCheck() && !this.hasMoves(),
      stalemate: !this.isCheck() && !this.hasMoves(),
      canPromote: this.canPromote(),
      previous:
        this.activeColour === "White" ? "Black" : ("White" as TPieceColour),
      current: this.activeColour,
    };

    return result;
  }

  /**
  * Locates a piece based on its name and colour.
  *
  * @param name - The piece name (e.g. King)
  * @param colour - The colour of the piece (Black or White).
  */
  findPiece(name: TPieceName, colour: TPieceColour): TCoordinates | undefined {
    for (const { piece, rowIndex, columnIndex } of this.getPieces()) {
      if (piece.colour !== colour) {
        continue;
      }

      if (piece.name !== name) {
        continue;
      }

      return [rowIndex, columnIndex];
    }
  }

  /**
   * Determines if the active player's King is in check.
   *
   * @returns True if any opponent piece has the active player's King in check.
   */
  isCheck(): boolean {
    const kingCoordinates = this.findPiece("King", this.activeColour);

    if (!kingCoordinates) {
      return false;
    }

    for (const { rowIndex, columnIndex, piece } of this.getPieces()) {
      if (piece.colour === this.activeColour) {
        continue;
      }

      const intersectingVector = piece.getIntersectingVector(
        kingCoordinates,
        [rowIndex, columnIndex],
        this,
      );

      if (typeof intersectingVector === "undefined") {
        continue;
      }

      const between = intersectingVector.before(kingCoordinates);

      if (between.isEmpty()) {
        return true;
      }
    }

    return false;
  }

  /**
   * Determines if the active player has any available moves.
  *
  * @returns True if the active player has at least one move.
  */
  hasMoves(): boolean {
    for (const { rowIndex, columnIndex, piece } of this.getPieces()) {
      if (piece.colour !== this.activeColour) {
        continue;
      }

      const moves = this.getAvailableSquares([rowIndex, columnIndex]);

      if (moves.length > 0) {
        return true;
      }
    }

    return false;
  }

  /**
  * Moves the appropriate rook when the active player is castling.
    *
    * @param from - The coordinates of their King.
    * @param to - The coordinates to which their King intends to move.
    */
  castleKing(from: TCoordinates, to: TCoordinates) {
    const movedPiece = this.board[to[0]][to[1]];

    if (movedPiece instanceof King === false) {
      return false;
    }

    if (from[0] - to[0] !== 0) {
      return false;
    }

    const netHorizontal = to[1] - from[1];

    if (![-2, 2].includes(netHorizontal)) {
      return false;
    }

    return this.move(
      [from[0], netHorizontal > 0 ? 7 : 0],
      [from[0], netHorizontal > 0 ? 5 : 3],
    );
  }

  /**
  * Returns an array of the pieces that have been taken so far.
  *
  * @returns the taken pieces.
  */
  getTaken(): TPiece[] {
    return this.taken;
  }

  /**
  * Calculates a list of possible moves for the selected piece.
  *
  * @returns An array of TCoordinates comtaining possible squares to move to.
  */
  getAvailableSquares(currentLocation: TCoordinates): TCoordinates[] {
    const moves: TCoordinates[] = [];
    const piece = this.getPiece(currentLocation);

    if (!piece || piece.colour !== this.activeColour) {
      return [];
    }

    for (const move of piece.getMoves()) {
      for (const target of this.getPossibleMoves(move)) {
        let isValid = true;

        const targetCoordinates: TCoordinates = this.getAbsoluteCoordinates(
          currentLocation,
          target,
        );

        if (!this.contains(targetCoordinates)) {
          continue;
        }

        for (const rule of this.rules) {
          rule.setPiece(currentLocation);

          if (!rule.isValid(target)) {
            isValid = false;
          }
        }

        if (isValid) {
          moves.push(targetCoordinates);
        }
      }
    }

    return moves;
  }
}

export default Board;
