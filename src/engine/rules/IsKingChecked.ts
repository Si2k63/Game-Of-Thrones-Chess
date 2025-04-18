import { TCoordinates, TPieceColour, TSquare } from '../Engine.types';
import King from '../pieces/King';
import AbstractMovementRule from './AbstractMovementRule';

class IsKingChecked extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();

        if (!piece) {
            return false;
        }

        if (piece instanceof King) {
            return true;
        }

        const targetCoordinates: TCoordinates = this.getAbsoluteCoordinates(this.piece, movement)
        const kingCoordinates = this.getKingCoordinates(piece.colour);

        if (!kingCoordinates) {
            return true;
        }

        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, enemy] of row.entries()) {
                if (!enemy || enemy?.colour == piece.colour) {
                    continue;
                }

                const intersectingVector = enemy.getIntersectingVector(kingCoordinates, [rowIndex, columnIndex], this.board)

                if (!intersectingVector) {
                    continue;
                }

                const between = intersectingVector
                    .before(kingCoordinates)

                if (!between.isEmpty()) {
                    continue;
                }

                const counterAttackVector = piece
                    .getIntersectingVector([rowIndex, columnIndex], this.piece, this.board);

                if (counterAttackVector && counterAttackVector.before([rowIndex, columnIndex]).isEmpty()) {
                    continue;
                }

                if (!between.push([rowIndex, columnIndex]).contains(targetCoordinates)) {
                    return false;
                }
            }
        }
        return true;
    }

    getKingCoordinates(colour: TPieceColour): TCoordinates | undefined {
        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, piece] of row.entries()) {
                if (!piece) {
                    continue;
                }

                if (piece instanceof King === false) {
                    continue;
                }

                if (piece.colour !== colour) {
                    continue;
                }

                return [rowIndex, columnIndex]
            }
        }
    }
}

export default IsKingChecked;
