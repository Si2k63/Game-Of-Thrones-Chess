import { TCoordinates } from "../Engine.types";
import Pawn from "../pieces/Pawn";
import AbstractMovementRule from "./AbstractMovementRule";

class IsPawnAbleToDash extends AbstractMovementRule {
  row: number | null = null;

  isValid(movement: TCoordinates) {
    const selectedPiece = this.getSelectedPiece();

    if (selectedPiece instanceof Pawn !== true) {
      return true;
    }

    if (![2, -2].includes(movement[0])) {
      return true;
    }

    const target = this.getTargetPiece(movement);

    if (target !== null) {
      return false;
    }

    const row = selectedPiece.colour == "White" ? 6 : 1;

    return this.piece[0] === row;
  }
}

export default IsPawnAbleToDash;
