import Board from "../Board";
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

    const jsonMovement = JSON.stringify(movement)
    const isAttemptingToCastle = ["[0,2]", "[0,-2]"].includes(jsonMovement);
    const rookSkin = jsonMovement === "[0,2]" ? "Right" : "Left";

    if (piece.hasMoved && isAttemptingToCastle) {
      return false;
    }

    for (const { piece: rook } of this.board.getPieces()) {

      if (rook.name !== "Rook" || rook.colour !== piece.colour || rook.skin !== rookSkin) {
        continue;
      }

      return !rook.hasMoved;

    }

    return false;
  }
}

export default IsAbleToCastle;
