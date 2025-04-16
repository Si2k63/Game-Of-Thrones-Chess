import { TCoordinates, TSquare } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsObstructed extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();

        if (!piece) {
            return false;
        }

        const vectors = piece.getRealVectors();
        const intersectingVector = vectors.filter(vector => vector.contains(movement)).pop();

        if (!intersectingVector) {
            return false;
        }

        intersectingVector.setBoard(this.board)

        return intersectingVector
            .before(movement)
            .setOrigin(this.piece)
            .absolute()
            .isEmpty();
    }
}

export default IsObstructed;
