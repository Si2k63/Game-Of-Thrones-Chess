import { TCoordinates, TPiece, TSquare } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsObstructed extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();
        const targetCoordinates: TCoordinates = this.getAbsoluteCoordinates(this.piece, movement);

        if (!piece) {
            return false;
        }

        const vectors = this.translateVectors(this.piece, piece.getVectors())
        const intersectingVector = this.getIntersectingVectors(vectors, targetCoordinates).pop()

        if (!intersectingVector) {
            return false;
        }

        const preceding = this.getMovesBefore(intersectingVector, targetCoordinates);
        return this.getVectorPieces(preceding).filter(x => x !== null).length == 0;
    }
}

export default IsObstructed;
