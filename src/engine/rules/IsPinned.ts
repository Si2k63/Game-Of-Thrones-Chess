import { TCoordinates, TSquare } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsPinned extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();

        if (!piece) {
            return false;
        }

        const targetCoordinates = this.getAbsoluteCoordinates(this.piece, movement);

        if (piece?.name == 'King') {
            return true;
        }

        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, enemy] of row.entries()) {
                if (!enemy || piece?.colour === enemy.colour) {
                    continue;
                }

                const vectors = enemy.getRealVectors();
                const intersectingVector = vectors.map(vector => {
                    return vector
                        .setOrigin([rowIndex, columnIndex])
                        .setBoard(this.board)
                        .absolute()
                        .insideBoard();
                }).filter(vector => vector.contains(this.piece)).pop();

                if (!intersectingVector) {
                    continue;
                }

                const squaresBefore = intersectingVector.before(this.piece);

                console.log(squaresBefore)

                if (!squaresBefore.isEmpty()) { // Something's in the way, yeah!
                    continue;
                }

                if (squaresBefore.endsWith(targetCoordinates)) { // we're the last piece in the vector.
                    continue;
                }

                const piecesAfter = intersectingVector.after(this.piece)
                const containsKing = piecesAfter.containsPiece('King', piece?.colour);

                intersectingVector.push([rowIndex, columnIndex]) // add enemy position to determine if we can take it.

                const containsTarget = intersectingVector.contains(targetCoordinates);

                if (containsKing && !containsTarget) { // We're pinned!
                    return false;
                }
            }
        }

        return true;

    }
}

export default IsPinned;
