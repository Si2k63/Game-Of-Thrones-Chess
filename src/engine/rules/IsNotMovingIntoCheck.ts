import { TCoordinates, TPiece, TSquare } from "../Engine.types";
import AbstractMovementRule from "./AbstractMovementRule";

class IsNotMovingIntoCheck extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const piece: TSquare = this.getSelectedPiece();

    if (piece?.name !== "King") {
      return true;
    }

    const targetCoordinates: TCoordinates = this.getAbsoluteCoordinates(
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

        if (!blockingPiece || blockingPiece == piece) {
          return false;
        }
      }
    }

    return true;
  }
}

export default IsNotMovingIntoCheck;
