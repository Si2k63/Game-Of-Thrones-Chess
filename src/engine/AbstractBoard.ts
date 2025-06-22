
import {
  TBoard,
  TCoordinates,
  TMovementRule,
} from "./Engine.types";

abstract class AbstractBoard {

  board: TBoard = [];
  rules: TMovementRule[] = [];

  constructor(board: TBoard) {
    this.board = board;
  }

  contains(targetCoordinates: TCoordinates) {
    return (
      targetCoordinates[0] >= 0 &&
      targetCoordinates[0] < this.board.length &&
      targetCoordinates[1] >= 0 &&
      targetCoordinates[1] < this.board[0].length
    );
  }

  getBoard() {
    return this.board;
  }

  addRule(rule: TMovementRule): AbstractBoard {
    this.rules.push(rule);
    return this;
  }

  getPiece(coords: TCoordinates) {
    return this.board[coords[0]][coords[1]];
  }

  static getVectorTarget(
    current: TCoordinates,
    vector: TCoordinates,
  ): TCoordinates {
    return [current[0] + vector[0], current[1] + vector[1]];
  }
}

export default AbstractBoard;
