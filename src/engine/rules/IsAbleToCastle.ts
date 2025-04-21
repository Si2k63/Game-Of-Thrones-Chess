import { TCoordinates, TSquare } from '../Engine.types';
import King from '../pieces/King';
import AbstractMovementRule from './AbstractMovementRule';

class IsAbleToCastle extends AbstractMovementRule {
    isValid(_: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();

        if (!piece) {
            return false;
        }

        if (piece instanceof King === false) {
            return true;
        }

        if (piece.hasMoved) {
            return false;
        }

        return true;
    }
}

export default IsAbleToCastle;
