import Board from "../Board";
import { TCoordinates, TPieceColour, TSquare } from "../Engine.types";
import King from "../pieces/King";
import AbstractMovementRule from "./AbstractMovementRule";

class IsKingChecked extends AbstractMovementRule {
  board: Board;

  constructor(board: Board) {
    super(board);
    this.board = board;
  }

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
    const kingCoordinates = this.board.findPiece("King", selectedPiece.colour);

    if (!kingCoordinates) {
      return true;
    }

    let intersectingVectorFound = false;

    for (const { rowIndex, columnIndex, piece } of this.board.getPieces()) {
      if (!piece || piece?.colour === selectedPiece.colour) {
        continue;
      }

      const intersectingVector = piece.getIntersectingVector(
        kingCoordinates,
        [rowIndex, columnIndex],
        this.board,
      );

      if (!intersectingVector) {
        continue;
      }

      const between = intersectingVector.before(kingCoordinates);

      if (!between.isEmpty()) {
        continue;
      }

      intersectingVectorFound = true;
      intersectingVector.push([rowIndex, columnIndex]);

      if (intersectingVector.contains(targetCoordinates)) {
        return true;
      }
    }

    return !intersectingVectorFound;
  }
}

export default IsKingChecked;
