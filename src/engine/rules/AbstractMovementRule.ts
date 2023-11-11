import { TBoard, TMovementRule, TSquare, TCoordinates } from '../Engine.types';

abstract class AbstractMovementRule implements TMovementRule {
  board: TBoard = [];
  piece: TCoordinates = [0, 0];

  setBoard(board: TBoard) {
    this.board = board;
  }  

  setPiece(piece: TCoordinates) {
    this.piece = piece;
  }

  getSelectedPiece(): TSquare {
    return this.board[this.piece[0]][this.piece[1]];
  }

  getTargetPiece(movement: TCoordinates): TSquare {
    return this.board[movement[0] + this.piece[0]][movement[1] + this.piece[1]];
  }

  abstract isValid(movement: TCoordinates): boolean
}

export default AbstractMovementRule;