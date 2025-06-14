import { TCoordinates, TSquare } from "../Engine.types";
import Pawn from "../pieces/Pawn";
import AbstractMovementRule from "./AbstractMovementRule";

class IsEnemyRule extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const selectedPiece: TSquare = this.getSelectedPiece();
    const target: TSquare = this.getTargetPiece(movement);

    if (selectedPiece instanceof Pawn !== true) {
      return true;
    } 

    if (![-1, 1].includes(movement[1])) {
      return true
    }

    return target?.colour !== selectedPiece?.colour && target !== null;
  }
}

export default IsEnemyRule;
