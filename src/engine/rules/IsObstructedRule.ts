import { TCoordinates } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsObstructedRule extends AbstractMovementRule {

  checkForObstructions(movement: TCoordinates): boolean {
    const targetRow = this.piece[0] + movement[0];
    const targetCol = this.piece[1] + movement[1];

    let curRow = this.piece[0];
    let curCol = this.piece[1];

    while (curRow != targetRow || curCol != targetCol) {
      const netRow = targetRow - curRow;
      const netCol = targetCol - curCol;
      const modRow = netRow == 0 ? 0 : netRow > 0 ? 1 : -1;
      const modCol = netCol == 0 ? 0 : netCol > 0 ? 1 : -1;

      curRow += modRow;
      curCol += modCol;

      if (curRow === targetRow && curCol === targetCol) {
        break;
      }

      if (this.board[curRow][curCol] !== null) {
        return false;
      }
    }
    return true;
  }

  isValid(movement: TCoordinates): boolean {
    if (this.getSelectedPiece()?.name === 'Knight') {
      return true;
    }

    return this.checkForObstructions(movement);
  }
}

export default IsObstructedRule;