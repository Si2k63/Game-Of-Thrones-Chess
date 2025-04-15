import { TCoordinates, TSquare } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsPinned extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();

        if (piece?.name == 'King') {
            return true;
        }

        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, enemy] of row.entries()) {

                if (!enemy || piece?.colour === enemy.colour) {
                    continue;
                }

                const vectors = this.translateVectors([rowIndex, columnIndex], enemy.getVectors())
                const intersectingVector = this.getIntersectingVectors(vectors, this.piece).pop();

                if (!intersectingVector) {
                    continue;
                }

                const squaresBefore = this.getSquaresBefore(intersectingVector, this.piece);

                if (squaresBefore.find(square => square !== null)) { // Something's in the way, yeah!
                    continue;
                }

                if (squaresBefore.length == intersectingVector.length - 1) { // we're the last piece in the vector.
                    continue;
                }

                const piecesAfter = this.getSquaresAfter(intersectingVector, this.piece);

                const kingIndex = piecesAfter.findIndex(square => {
                    return square?.name == 'King' && square?.colour == piece?.colour
                })

                intersectingVector.push([rowIndex, columnIndex]) // add enemy position

                const targetIndex = intersectingVector
                    .findIndex(square => square[0] == this.piece[0] + movement[0] && square[1] == this.piece[1] + movement[1]);

                if (kingIndex >= 0 && targetIndex < 0) { // We're pinned!
                    return false;
                }
            }
        }

        return true;

    }
}

export default IsPinned;
