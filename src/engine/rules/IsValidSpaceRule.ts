import { TCoordinates } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsValidSpaceRule extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
        const row = this.piece[0] + movement[0];
        const column = this.piece[1] + movement[1];
        if (typeof this.board[row] === 'undefined') {
            return false;
        }

        return typeof this.board[row][column] !== 'undefined';
    }
}

export default IsValidSpaceRule;
