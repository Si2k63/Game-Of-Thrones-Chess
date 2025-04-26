import { TCoordinates, TSquare } from '../Engine.types';
import King from '../pieces/King';
import AbstractMovementRule from './AbstractMovementRule';

class IsAbleToCastle extends AbstractMovementRule {
    isValid(coordinates: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();
        const targetCoordinates: TCoordinates = this.getAbsoluteCoordinates(this.piece, coordinates);
        if (!piece) {
            return false;
        }

        if (piece instanceof King === false) {
            return true;
        }

        if (piece.hasMoved) {
            return false;
        }

        const vector = piece.getIntersectingVector(targetCoordinates, this.piece, this.board)

        if (!vector) {
            return false;
        }

        return vector.isEmpty();
    }
}

export default IsAbleToCastle;
