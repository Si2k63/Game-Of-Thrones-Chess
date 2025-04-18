import { TCoordinates, TPieceColour, TSquare } from '../Engine.types';
import King from '../pieces/King';
import AbstractMovementRule from './AbstractMovementRule';

class IsAbleToCastle extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
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

        //        const targetCoordinates: TCoordinates = this.getAbsoluteCoordinates(this.piece, movement)

        return true;
    }
}

export default IsAbleToCastle;
