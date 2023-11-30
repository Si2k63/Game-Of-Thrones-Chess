import { TBoard, TCoordinates, TMovementRule } from './Engine.types';
import IsNullOrEnemyRule from './Rules/IsNullOrEnemyRule';
import IsObstructedRule from './Rules/IsObstructedRule';
import IsValidSpaceRule from './Rules/IsValidSpaceRule';

interface MoveInterface {
  movement: TCoordinates,
  rules: TMovementRule[]

}

class Move implements MoveInterface {
  movement: TCoordinates = [0, 0];
  rules: TMovementRule[] = [
    new IsValidSpaceRule(),
    new IsNullOrEnemyRule(),
    new IsObstructedRule()
  ];

  /**
   * @param movement relative TCoordinates to travel to.
   */
  constructor(movement: TCoordinates) {
    this.movement = movement;
  }

  getTargetTCoordinates(piece: TCoordinates): TCoordinates {
    return [this.movement[0] + piece[0], this.movement[1] + piece[1]]
  }

  getMovement() {
    return this.movement;
  }

  addRule(rule: TMovementRule): Move {
    this.rules.push(rule);
    return this;
  }

  isValid(board: TBoard, piece: TCoordinates) {
    for (const rule of this.rules) {
      rule.setBoard(board);
      rule.setPiece(piece);
      if (!rule.isValid(this.movement)) {
        return false;
      }
    }

    return true;
  }
}

export default Move;