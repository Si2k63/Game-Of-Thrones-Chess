import Board from "../Board";
import { TCoordinates, TSquare } from "../Engine.types";
import King from "../pieces/King";
import AbstractMovementRule from "./AbstractMovementRule";

class IsPinned extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const selectedPiece: TSquare = this.getSelectedPiece();

    if (!selectedPiece) {
      return false;
    }

    const targetCoordinates = this.board.getAbsoluteCoordinates(
      this.piece,
      movement,
    );

    if (selectedPiece instanceof King === true) {
      return true;
    }

    for (const { rowIndex, columnIndex, piece } of this.board.getPieces()) {
      if (selectedPiece.colour === piece.colour) {
        continue;
      }

      const intersectingVector = piece.getIntersectingVector(
        this.piece,
        [rowIndex, columnIndex],
        this.board,
      );

      if (!intersectingVector) {
        continue;
      }

      const squaresBefore = intersectingVector.before(this.piece);

      if (!squaresBefore.isEmpty()) {
        // Something's in the way, yeah!
        continue;
      }

      if (squaresBefore.endsWith(targetCoordinates)) {
        // we're the last piece in the vector.
        continue;
      }

      const piecesAfter = intersectingVector.after(this.piece);
      const kingsIndex = piecesAfter.findPieceIndex("King", selectedPiece.colour);

      const containsKing = kingsIndex >= 0;

      if (!containsKing) {
        continue;
      }

      const hasPiecesBeforeKing = !piecesAfter.slice(1, kingsIndex).isEmpty();

      if (hasPiecesBeforeKing) {
        continue;
      }

      intersectingVector.push([rowIndex, columnIndex]); // add enemy position to determine if we can take it.

      const containsTarget = intersectingVector.contains(targetCoordinates);

      if (containsKing && !containsTarget) {
        // We're pinned!
        return false;
      }
    }

    return true;
  }
}

export default IsPinned;
