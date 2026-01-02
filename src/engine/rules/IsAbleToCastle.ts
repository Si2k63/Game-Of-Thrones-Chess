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

    if (this.board.hasPieceMoved(this.piece) && isAttemptingToCastle) {
      return false;
    }

    for (const { piece: rook, rowIndex, columnIndex } of this.board.getPieces()) {

      if (rook.name !== "Rook" || rook.colour !== piece.colour || rook.skin !== rookSkin) {
        continue;
      }

      return !this.board.hasPieceMoved([rowIndex, columnIndex]);

    }

    return false;
  }
}

export default IsAbleToCastle;
