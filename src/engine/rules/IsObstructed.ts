import { TCoordinates, TSquare } from "../Engine.types";
import AbstractMovementRule from "./AbstractMovementRule";

class IsObstructed extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const piece: TSquare = this.getSelectedPiece();

    if (!piece) {
      return false;
    }

    const vectors = piece.getVectors(this.piece, this.board);
    const intersectingVector = vectors
      .filter((vector) => vector.contains(movement))
      .pop();

    if (!intersectingVector) {
      return false;
    }

    return intersectingVector.before(movement).absolute().isEmpty();
  }
}

export default IsObstructed;
