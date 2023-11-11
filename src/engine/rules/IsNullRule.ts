import { TCoordinates } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsNullRule extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
      const target = this.getTargetPiece(movement)
      return target === null
    }
}

export default IsNullRule;