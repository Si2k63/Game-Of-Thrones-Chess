import { TCoordinates, TPieceColour, TSquare } from "../Engine.types";
import King from "../pieces/King";
import AbstractMovementRule from "./AbstractMovementRule";

class IsKingChecked extends AbstractMovementRule {
  isValid(movement: TCoordinates) {
    const piece: TSquare = this.getSelectedPiece();

    if (!piece) {
      return false;
    }

    if (piece instanceof King) {
      return true;
    }

    const targetCoordinates: TCoordinates = this.getAbsoluteCoordinates(
      this.piece,
      movement,
    );
    const kingCoordinates = this.getKingCoordinates(piece.colour);

    if (!kingCoordinates) {
      return true;
    }

    let intersectingVectorFound = false;

    for (const [rowIndex, row] of this.board.entries()) {
      for (const [columnIndex, enemy] of row.entries()) {
        if (!enemy || enemy?.colour == piece.colour) {
          continue;
        }

        const intersectingVector = enemy.getIntersectingVector(
          kingCoordinates,
          [rowIndex, columnIndex],
          this.board,
        );

        if (!intersectingVector) {
          continue;
        }

        intersectingVectorFound = true;

        const between = intersectingVector.before(kingCoordinates);

        if (!between.isEmpty()) {
          continue;
        }

        intersectingVector.push([rowIndex, columnIndex]);

        if (intersectingVector.contains(targetCoordinates)) {
          return true;
        }
      }
    }

    return !intersectingVectorFound;
  }

  getKingCoordinates(colour: TPieceColour): TCoordinates | undefined {
    for (const [rowIndex, row] of this.board.entries()) {
      for (const [columnIndex, piece] of row.entries()) {
        if (!piece) {
          continue;
        }

        if (piece instanceof King === false) {
          continue;
        }

        if (piece.colour !== colour) {
          continue;
        }

        return [rowIndex, columnIndex];
      }
    }
  }
}

export default IsKingChecked;
