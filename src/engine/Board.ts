import {
  MoveResult,
  TBoard,
  TCoordinates,
  TPiece,
  TPieceColour,
  TPieceName,
  TSquare,
  TMovementRule
} from "./Engine.types";

import King from "./pieces/King";
import IsEnemyRule from "./rules/IsEnemyRule";
import IsKingChecked from "./rules/IsKingChecked";
import IsNotMovingIntoCheck from "./rules/IsNotMovingIntoCheck";
import IsNullOrEnemyRule from "./rules/IsNullOrEnemyRule";
import IsNullRule from "./rules/IsNullRule";
import IsObstructed from "./rules/IsObstructed";
import IsPawnAbleToDash from "./rules/IsPawnAbleToDash";
import IsPinned from "./rules/IsPinned";

import IsValidSpaceRule from "./rules/IsValidSpaceRule";

class Board {
  board: TBoard = [];
  activeColour: TPieceColour = "White";
  taken: TPiece[] = [];

  rules: TMovementRule[] = [
    new IsValidSpaceRule(),
    new IsNullOrEnemyRule(),
    new IsPinned(),
    new IsObstructed(),
    new IsNotMovingIntoCheck(),
    new IsKingChecked(),
    new IsPawnAbleToDash(),
    new IsNullRule(),
    new IsEnemyRule()
  ];

  constructor(board: TBoard) {
    this.board = board;
  }

  getBoard() {
    return this.board;
  }

  reset(board: TBoard) {
    this.activeColour = "White";
    this.board = board;
    this.taken = [];
  }

  addRule(rule: TMovementRule): Board {
    this.rules.push(rule);
    return this;
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
        : row
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
    const indexes = [0, this.board.length - 1];
    for (const index of indexes) {
      for (const [columnIndex, piece] of this.board[index].entries()) {
        if (!piece) {
          continue;
        }

        if (piece.colour !== this.activeColour && piece.name === "Pawn") { // already switched after completion of move.
          this.board[index][columnIndex] = replacement;
        }
      }
    }
  }

  canPromote(): boolean {
    const indexes = [0, this.board.length - 1];

    for (const index of indexes) {
      for (const piece of this.board[index]) {
        if (!piece) {
          continue;
        }

        if (piece.colour === this.activeColour && piece.name === "Pawn") {
          return true;
        }
      }
    }

    return false;
  }

  checkResult(): MoveResult {


    this.changeActiveColour();
    console.log("isCheck", this.isCheck());
    console.log("hasMoves", this.hasMoves());
    const result = {
      checkmate: this.isCheck() && !this.hasMoves(),
      stalemate: !this.isCheck() && !this.hasMoves(),
      canPromote: this.canPromote(),
      previous:
        (this.activeColour == "White" ? "Black" : "White" as TPieceColour),
      current: this.activeColour,
    };


    return result;
  }

  findPiece(name: TPieceName, colour: TPieceColour): TCoordinates | undefined {
    for (const [rowIndex, row] of this.board.entries()) {
      for (const [columnIndex, _] of row.entries()) {
        const piece = this.board[rowIndex][columnIndex];

        if (!piece) {
          continue;
        }

        if (piece.colour !== colour) {
          continue;
        }

        if (piece.name !== name) {
          continue;
        }

        return [rowIndex, columnIndex];
      }
    }
  }

  isCheck(): boolean {
    const kingCoordinates = this.findPiece(
      "King",
      this.activeColour
    );

    console.log(this.activeColour);

    if (!kingCoordinates) {
      return false;
    }

    for (const [rowIndex, row] of this.board.entries()) {
      for (const [columnIndex, _] of row.entries()) {
        const enemy = this.board[rowIndex][columnIndex];
        if (!enemy) {
          continue;
        }

        if (enemy.colour !== this.activeColour) {
          continue;
        }

        const intersectingVector = enemy.getIntersectingVector(
          kingCoordinates,
          [rowIndex, columnIndex],
          this.board,
        );

        if (typeof intersectingVector === "undefined") {
          continue;
        }

        console.log(enemy)

        const between = intersectingVector
          .before(kingCoordinates);

        if (between.isEmpty()) {
          return true;
        }
      }
    }

    return false;
  }

  hasMoves(): boolean {
    for (const [rowIndex, row] of this.board.entries()) {
      for (const [columnIndex, piece] of row.entries()) {
        if (!piece) {
          continue;
        }

        if (piece.colour !== this.activeColour) {
          continue;
        }

        const moves = this.getAvailableSquares([rowIndex, columnIndex]);

        if (moves.length > 0) {
          return true;
        }
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

    return this.move([from[0], netHorizontal > 0 ? 7 : 0], [
      from[0],
      netHorizontal > 0 ? 5 : 3,
    ]);
  }

  getPiece(coords: TCoordinates) {
    return this.board[coords[0]][coords[1]];
  }

  getTaken() {
    return this.taken;
  }

  static getVectorTarget(current: TCoordinates, vector: TCoordinates): TCoordinates {
    return [current[0] + vector[0], current[1] + vector[1]];
  }


  // getValidMoves
  getAvailableSquares(currentLocation: TCoordinates) {
    const board: TBoard = this.board;
    const moves: TCoordinates[] = [];
    const piece = this.getPiece(currentLocation);

    if (!piece || piece.colour !== this.activeColour) {
      return [];
    }

    for (const move of piece.getMoves()) {
      let isValid = true;

      for(const target of move.getPossibleMoves()) {

        const targetCoordinates: TCoordinates = Board.getVectorTarget(
          currentLocation,
          target,
        );

        for (const rule of this.rules) {

          if (
            targetCoordinates[0] < 0 || targetCoordinates[0] >= board.length ||
              targetCoordinates[1] < 0 || targetCoordinates[1] >= board[0].length
          ) {
            isValid = false;
          }
          rule.setBoard(board);
          rule.setPiece(currentLocation);

          if (!rule.isValid(target)) {
            isValid = false;
            break;
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
