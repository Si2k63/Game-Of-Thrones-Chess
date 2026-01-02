import {
  TAbstractBoard,
  TBoard,
  TBoardPiece,
  TCoordinates,
  TMove,
  TMovementRule,
  TPiece,
  TSquare,
} from "./Engine.types";

abstract class AbstractBoard implements TAbstractBoard {
  board: TBoard = [];
  rules: TMovementRule[] = [];
  moved: TPiece[] = [];

  constructor(board: TBoard) {
    this.board = board;
  }

  contains(targetCoordinates: TCoordinates): boolean {
    return (
      targetCoordinates[0] >= 0 &&
      targetCoordinates[0] < this.board.length &&
      targetCoordinates[1] >= 0 &&
      targetCoordinates[1] < this.board[0].length
    );
  }

  move(from: TCoordinates, to: TCoordinates): void {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = this.getPiece(from);

    if (!piece) {
      return;
    }

    const newBoard = [...this.board];

    newBoard[fromRow] = [...newBoard[fromRow]];
    newBoard[fromRow][fromCol] = null;
    newBoard[toRow] = [...newBoard[toRow]];
    newBoard[toRow][toCol] = piece;
    this.board = newBoard;

    if (!this.moved.includes(piece)) {
      this.moved.push(piece);
    }
  }

  hasPieceMoved(coordinates: TCoordinates): boolean {
    const piece = this.getPiece(coordinates);

    if (!piece) {
      return false;
    }

    return this.moved.includes(piece);
  }

  getBoard(): TBoard {
    return this.board;
  }

  addRule(rule: TMovementRule): TAbstractBoard {
    this.rules.push(rule);
    return this;
  }

  getPiece(coords: TCoordinates): TSquare {
    return this.board[coords[0]][coords[1]];
  }

  *getPieces(): Generator<TBoardPiece> {
    for (const [rowIndex, row] of this.board.entries()) {
      for (const [columnIndex, piece] of row.entries()) {
        if (!piece) {
          continue;
        }
        yield { rowIndex, columnIndex, piece };
      }
    }
  }

  getAbsoluteCoordinates(
    current: TCoordinates,
    vector: TCoordinates,
  ): TCoordinates {
    return [current[0] + vector[0], current[1] + vector[1]];
  }

  getPossibleMoves(move: TMove) {
    const maximumRecurrences = move.getMaximumRecurrences();
    const target = move.getMovement();
    if (maximumRecurrences === 1) {
      return [target];
    }
    const moves: TCoordinates[] = [];

    let start: TCoordinates = [0, 0];

    for (let i = 0; i < maximumRecurrences; i++) {
      start = this.getAbsoluteCoordinates(start, target);
      moves.push(start);
    }

    return moves;
  }
}

export default AbstractBoard;
