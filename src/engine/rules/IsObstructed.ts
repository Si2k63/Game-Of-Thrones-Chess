import { TCoordinates, TSquare } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsObstructed extends AbstractMovementRule {

    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();
        const targetCoordinates: TCoordinates = this.getTargetCoordinates(movement);

        if (targetCoordinates[0] !== 0 && targetCoordinates[1] !== 2) {
            return true;
        }

        if (!piece) {
            return false;
        }

        // @TODO: similar to IsPinned - refactor?
        const vector = piece
            .getVectors(this.board, [this.piece[0], this.piece[1]])
            .map(vector => {
                return vector
                    .map(square => this.getTargetCoordinates(square))
                    .filter(square => square[0] >= 0 && square[1] >= 0 && square[0] < this.board.length && square[1] < this.board[0].length)
            })
            .filter(vector => vector.map(square => JSON.stringify(square)).includes(JSON.stringify(targetCoordinates)))
            .pop()


        if (!vector) {
            return false;
        }

        const targetIndex = vector.findIndex(square => square[0] == targetCoordinates[0] && square[1] == targetCoordinates[1]);

        for (const [index, square] of vector.entries()) {
            if (this.board[square[0]][square[1]] == null) {
                continue;
            }

            if (square[0] !== targetCoordinates[0] && square[1] !== targetCoordinates[1] && index < targetIndex) {
                return false;
            }
        }
        return true;
    }
}

export default IsObstructed;
