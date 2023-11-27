import { TCoordinates, TSquare } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsEnemyRule extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();
        const target: TSquare = this.getTargetPiece(movement);

        return target?.colour !== piece?.colour && target !== null;
    }
}

export default IsEnemyRule;