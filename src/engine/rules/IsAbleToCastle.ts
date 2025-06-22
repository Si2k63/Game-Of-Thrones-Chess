import { TCoordinates, TSquare } from "../Engine.types";
import King from "../pieces/King";
import AbstractMovementRule from "./AbstractMovementRule";

class IsAbleToCastle extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const piece: TSquare = this.getSelectedPiece();

    if (!piece) {
      return false;
    }

    if (piece instanceof King === false) {
      return true;
    }

    const isAttemptingToCastle = ["[0,2]", "[0,-2]"].includes(
      JSON.stringify(movement),
    );

    if (piece.hasMoved && isAttemptingToCastle) {
      return false;
    }

    return true;
  }
}

export default IsAbleToCastle;
