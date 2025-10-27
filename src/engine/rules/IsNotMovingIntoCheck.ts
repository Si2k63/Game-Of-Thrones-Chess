import Board from "../Board";
import { TCoordinates, TSquare } from "../Engine.types";
import Pawn from "../pieces/Pawn";
import AbstractMovementRule from "./AbstractMovementRule";

class IsNotMovingIntoCheck extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const selectedPiece: TSquare = this.getSelectedPiece();

    if (selectedPiece?.name !== "King") {
      return true;
    }

    const targetCoordinates: TCoordinates = this.board.getAbsoluteCoordinates(
      this.piece,
      movement,
    );

    for (const { rowIndex, columnIndex, piece } of this.board.getPieces()) {
      if (selectedPiece?.colour === piece.colour) {
        continue;
      }

      const intersectingVector = piece.getIntersectingVector(
        targetCoordinates,
        [rowIndex, columnIndex],
        this.board,
      );

      if (!intersectingVector) {
        continue;
      }

      const blockingPiece = intersectingVector
        .before(targetCoordinates)
        .firstPiece();

      // Pawns are awkward and have non-attacking moves.
      if (
        piece instanceof Pawn === true &&
        intersectingVector.relative().containsAny([
          [-1, 0],
          [-2, 0],
          [1, 0],
          [2, 0],
        ])
      ) {
        continue;
      }


      if (!blockingPiece || blockingPiece === piece || blockingPiece === selectedPiece) {
        return false;
      }
    }

    return true;
  }
}

export default IsNotMovingIntoCheck;
