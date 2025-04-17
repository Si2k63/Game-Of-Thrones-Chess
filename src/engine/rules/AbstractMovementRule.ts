import { TBoard, TCoordinates, TMovementRule, TPieceColour, TPieceName, TSquare } from '../Engine.types';

abstract class AbstractMovementRule implements TMovementRule {
    board: TBoard = [];
    piece: TCoordinates = [0, 0];
    path: TCoordinates[] = [];

    setBoard(board: TBoard) {
        this.board = board;
    }

    setPiece(piece: TCoordinates) {
        this.piece = piece;
    }

    getSelectedPiece(): TSquare {
        return this.board[this.piece[0]][this.piece[1]];
    }

    getAbsoluteCoordinates = (position: TCoordinates, movement: TCoordinates): TCoordinates => [position[0] + movement[0], position[1] + movement[1]];

    getTargetPiece(movement: TCoordinates): TSquare {
        return this.board[movement[0] + this.piece[0]][movement[1] + this.piece[1]];
    }

    abstract isValid(movement: TCoordinates): boolean
}

export default AbstractMovementRule;
