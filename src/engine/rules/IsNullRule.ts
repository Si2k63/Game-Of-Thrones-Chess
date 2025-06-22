import { TCoordinates } from "../Engine.types";
import Pawn from "../pieces/Pawn";
import AbstractMovementRule from "./AbstractMovementRule";

class IsNullRule extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const selectedPiece = this.getSelectedPiece();

    if (selectedPiece instanceof Pawn !== true) {
      return true;
    }

    if ([-1, 1].includes(movement[0]) && [-1, 1].includes(movement[1])) {
      return true;
    }

    const target = this.getTargetPiece(movement);
    return target === null;
  }
}

export default IsNullRule;
