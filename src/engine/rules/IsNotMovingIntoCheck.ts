import { TCoordinates, TPiece, TSquare } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsNotMovingIntoCheck extends AbstractMovementRule {

    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();

        if (piece?.name !== 'King') {
            return true;
        }

        const target: TCoordinates = this.getAbsoluteCoordinates(this.piece, movement)

        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, enemy] of row.entries()) {
                if (!enemy || piece?.colour === enemy.colour) {
                    continue;
                }

                const vectors = this.translateVectors([rowIndex, columnIndex], enemy.getVectors())
                const intersectingVector = this.getIntersectingVectors(vectors, target).pop();

                if (!intersectingVector) {
                    continue;
                }

                const squaresBefore = this.getSquaresBefore(intersectingVector, target);
                const blockingPiece = squaresBefore.find(square => square !== null);

                if (!blockingPiece || blockingPiece == piece) {
                    return false;
                }
            }
        }

        return true;
    }
}

export default IsNotMovingIntoCheck;
