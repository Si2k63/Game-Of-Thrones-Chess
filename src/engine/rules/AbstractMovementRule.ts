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

    getIntersectingVectors(vectors: TCoordinates[][], targetCoordinates: TCoordinates) {
        return vectors.filter(vector => vector.map(square => JSON.stringify(square)).includes(JSON.stringify(targetCoordinates)))
    }

    translateVectors(currentPosition: TCoordinates, vectors: TCoordinates[][]) {
        return vectors.map(vector => {
            return vector
                .map(target => this.getAbsoluteCoordinates(currentPosition, target))
                .filter(target => target[0] >= 0 && target[1] >= 0 && target[0] < this.board.length && target[1] < this.board[0].length)
        })
    }

    getIndex(vector: TCoordinates[], coordinates: TCoordinates) {
        return vector.findIndex(square => square[0] == coordinates[0] && square[1] == coordinates[1]);
    }

    getMovesBefore(vector: TCoordinates[], coordinates: TCoordinates) {
        const targetIndex = this.getIndex(vector, coordinates);
        return vector.slice(0, targetIndex)
    }

    getMovesAfter(vector: TCoordinates[], coordinates: TCoordinates) {
        const targetIndex = this.getIndex(vector, coordinates);
        return vector.slice(targetIndex)
    }

    getSquaresBefore(vector: TCoordinates[], coordinates: TCoordinates) {
        return this.getVectorPieces(this.getMovesBefore(vector, coordinates));
    }

    getSquaresAfter(vector: TCoordinates[], coordinates: TCoordinates) {
        return this.getVectorPieces(this.getMovesAfter(vector, coordinates));
    }

    getVectorPieces(vector: TCoordinates[]) {
        return vector.map(x => this.board[x[0]][x[1]])
    }

    getTargetPiece(movement: TCoordinates): TSquare {
        return this.board[movement[0] + this.piece[0]][movement[1] + this.piece[1]];
    }

    abstract isValid(movement: TCoordinates): boolean
}

export default AbstractMovementRule;
