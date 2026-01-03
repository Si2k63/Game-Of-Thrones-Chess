import { TCoordinates, TSquare } from "../Engine.types";
import Vector from "../helpers/Vector";
import AbstractMovementRule from "./AbstractMovementRule";

class IsObstructed extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const piece: TSquare = this.getSelectedPiece();

    if (!piece) {
      return false;
    }

    const vectors = this.board.getVectors(this.piece);
    const intersectingVector = vectors
      .filter((vector: Vector) => vector.contains(movement))
      .pop();

    if (!intersectingVector) {
      return false;
    }

    return intersectingVector.before(movement).absolute().isEmpty();
  }
}

export default IsObstructed;
