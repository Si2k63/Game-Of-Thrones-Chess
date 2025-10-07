import AbstractBoard from "./AbstractBoard";
import {
  MoveResult,
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
    /*
    new IsNullOrEnemyRule(),
    new IsObstructed(),
    new IsNotMovingIntoCheck(),
    new IsKingChecked(),
    new IsPawnAbleToDash(),
    new IsNullRule(),
    new IsEnemyRule(),
    new IsAbleToCastle(),
    */
  ];

  reset(board: TBoard) {
    this.activeColour = "White";
    this.board = board;
    this.taken = [];
  }
  move(from: TCoordinates, to: TCoordinates): MoveResult {
    this.board = this.board.map((row, rowIndex) =>
      rowIndex === from[0] || rowIndex === to[0]
        ? row.map((cell, colIndex) => {
          if (rowIndex === from[0] && colIndex === from[1]) return null;
          if (rowIndex === to[0] && colIndex === to[1]) {
            return this.board[from[0]][from[1]];
          }
          return cell;
        })
        : row,
    );

    const movedPiece = this.board[to[0]][to[1]];
    movedPiece?.setHasMoved();

    if (this.castleKing(from, to)) {
      this.changeActiveColour();
      return this.checkResult();
    }

    return this.checkResult();
  }

  changeActiveColour() {
    this.activeColour = this.activeColour == "White" ? "Black" : "White";
  }

  /*
   * @TODO: There's too much repetition in this class - needs refactoring - board iterator?
   */
  promote(replacement: TSquare) {
    for (const { piece, rowIndex, columnIndex } of this.getPieces()) {
      if (piece.colour !== this.activeColour && piece.name === "Pawn") {
        // already switched after completion of move.
        this.board[rowIndex][columnIndex] = replacement;
      }
    }
  }

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

  checkResult(): MoveResult {
    this.changeActiveColour();
    const result = {
      checkmate: this.isCheck() && !this.hasMoves(),
      stalemate: !this.isCheck() && !this.hasMoves(),
      canPromote: this.canPromote(),
      previous:
        this.activeColour == "White" ? "Black" : ("White" as TPieceColour),
      current: this.activeColour,
    };

    return result;
  }

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

  isCheck(): boolean {
    const kingCoordinates = this.findPiece("King", this.activeColour);

    if (!kingCoordinates) {
      return false;
    }

    for (const { rowIndex, columnIndex, piece } of this.getPieces()) {

      if (piece.colour !== this.activeColour) {
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

  getTaken() {
    return this.taken;
  }

  getAvailableSquares(currentLocation: TCoordinates) {
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
