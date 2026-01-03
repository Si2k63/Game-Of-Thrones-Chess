import Board from "../Board";
import { TCoordinates, TSquare } from "../Engine.types";
import King from "../pieces/King";
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


      intersectingVectorFound = true;
      between.push([rowIndex, columnIndex]);

      if (between.contains(targetCoordinates)) {
        return true;
      }
    }

    return !intersectingVectorFound;
  }
}

export default IsKingChecked;
