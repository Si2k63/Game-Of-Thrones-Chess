import { TAbstractBoard, TBoard, TCoordinates, TMovementRule, TSquare } from "./Engine.types";

abstract class AbstractBoard implements TAbstractBoard {
  board: TBoard = [];
  rules: TMovementRule[] = [];

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

  static getAbsoluteCoordinates(
    current: TCoordinates,
    vector: TCoordinates,
  ): TCoordinates {
    return [current[0] + vector[0], current[1] + vector[1]];
  }
}

export default AbstractBoard;
