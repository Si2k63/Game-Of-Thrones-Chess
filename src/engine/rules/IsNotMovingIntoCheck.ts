import Board from "../Board";
import { TCoordinates, TSquare } from "../Engine.types";
import Pawn from "../pieces/Pawn";
import AbstractMovementRule from "./AbstractMovementRule";

class IsNotMovingIntoCheck extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const piece: TSquare = this.getSelectedPiece();

    if (piece?.name !== "King") {
      return true;
    }

    const targetCoordinates: TCoordinates = Board.getAbsoluteCoordinates(
      this.piece,
      movement,
    );

    for (const [rowIndex, row] of this.board.entries()) {
      for (const [columnIndex, enemy] of row.entries()) {
        if (!enemy || piece?.colour === enemy.colour) {
          continue;
        }

        const intersectingVector = enemy.getIntersectingVector(
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
          enemy instanceof Pawn === true &&
          intersectingVector.relative().containsAny([
            [-1, 0],
            [-2, 0],
            [1, 0],
            [2, 0],
          ])
        ) {
          continue;
        }

        if (!blockingPiece || blockingPiece == piece) {
          return false;
        }
      }
    }

    return true;
  }
}

export default IsNotMovingIntoCheck;
