import { TCoordinates } from "../Engine.types";
import AbstractMovementRule from "./AbstractMovementRule";

class IsValidSpaceRule extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const targetCoordinates = this.board.getAbsoluteCoordinates(this.piece, movement);
    return this.board.contains(targetCoordinates)
  }
}

export default IsValidSpaceRule;
