import Board from "../Board";
import { TCoordinates, TSquare } from "../Engine.types";
import King from "../pieces/King";
import Pawn from "../pieces/Pawn";
import AbstractMovementRule from "./AbstractMovementRule";

class IsKingChecked extends AbstractMovementRule {

  isValid(movement: TCoordinates) {
    const selectedPiece: TSquare = this.getSelectedPiece();

    if (!selectedPiece) {
      return false;
    }

    if (selectedPiece instanceof King) {
      return true;
    }

    const targetCoordinates: TCoordinates = this.board.getAbsoluteCoordinates(
      this.piece,
      movement,
    );
    const kingCoordinates = (<Board>this.board).findPiece("King", selectedPiece.colour);

    if (!kingCoordinates) {
      return true;
    }

    let intersectingVectorFound = false;

    for (const { rowIndex, columnIndex, piece } of this.board.getPieces()) {
      if (!piece || piece?.colour === selectedPiece.colour) {
        continue;
      }

      const intersectingVector = this.board.getIntersectingVector(
        kingCoordinates,
        [rowIndex, columnIndex]
      );

      if (!intersectingVector) {
        continue;
      }

      const between = intersectingVector.before(kingCoordinates);

      if (!between.isEmpty()) {
        continue;
      }

      // The pawn is on the same file as the king, but the king is not in check.
      if (piece instanceof Pawn == true && columnIndex == kingCoordinates[1]) {
        continue;
      }


      intersectingVectorFound = true;
      between.push([rowIndex, columnIndex]);

      if (between.contains(targetCoordinates)) {
        return true;
      }
    }

    console.log(!intersectingVectorFound);
    return !intersectingVectorFound;
  }
}

export default IsKingChecked;
