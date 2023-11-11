import { TCoordinates } from "../Engine.types";
import AbstractMovementRule from "./AbstractMovementRule";

class IsSameColourRule extends AbstractMovementRule {
  isValid(movement: TCoordinates): boolean {
    return this.getSelectedPiece()?.colour !== this.getTargetPiece(movement)?.colour
  }
}

export default IsSameColourRule;