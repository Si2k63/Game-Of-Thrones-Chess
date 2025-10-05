import { TAbstractBoard, TCoordinates, TMovementRule, TSquare } from "../Engine.types";

abstract class AbstractMovementRule implements TMovementRule {
  board: TAbstractBoard;
  piece: TCoordinates = [0, 0];
  path: TCoordinates[] = [];

  constructor(board: TAbstractBoard) {
    this.board = board;
  }

  setPiece(piece: TCoordinates) {
    this.piece = piece;
  }

  getSelectedPiece(): TSquare {
    return this.board.getPiece(this.piece)
  }

  getTargetPiece(movement: TCoordinates): TSquare {
    const coords = this.board.getAbsoluteCoordinates(this.piece, movement);
    return this.board.getPiece(coords);
  }

  abstract isValid(movement: TCoordinates): boolean;
}

export default AbstractMovementRule;
