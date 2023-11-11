import IsObstructedRule from './rules/IsObstructedRule';
import IsNullOrEnemyRule from './rules/IsNullOrEnemyRule';
import IsValidSpaceRule from './rules/IsValidSpaceRule';
import { TBoard, TMovementRule, TCoordinates } from './Engine.types';

interface MoveInterface {
  movement: TCoordinates,

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

    getTargetTCoordinates(piece: TCoordinates) {
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