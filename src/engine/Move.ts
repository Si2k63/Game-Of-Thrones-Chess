import { TBoard, TCoordinates, TMovementRule } from "./Engine.types";
import IsNullOrEnemyRule from "./rules/IsNullOrEnemyRule";
import IsObstructed from "./rules/IsObstructed";
import IsPinned from "./rules/IsPinned";
import IsValidSpaceRule from "./rules/IsValidSpaceRule";

interface MoveInterface {
  movement: TCoordinates;
  maximumRecurrences: number;
  rules: TMovementRule[];
}

class Move implements MoveInterface {
  movement: TCoordinates = [0, 0];
  maximumRecurrences: number = 1;
  isRecurring = false;

  rules: TMovementRule[] = [
    new IsValidSpaceRule(),
    new IsNullOrEnemyRule(),
    new IsPinned(),
  ];

  /**
   * @param movement relative TCoordinates to travel to.
   * 
   */
  constructor(movement: TCoordinates, maximumRecurrences: number = 1) {
    this.movement = movement;
    this.maximumRecurrences = maximumRecurrences;
  }

  getVectorTarget(current: TCoordinates, vector: TCoordinates): TCoordinates {
    return [current[0] + vector[0], current[1] + vector[1]];
  }

  addRule(rule: TMovementRule): Move {
    this.rules.push(rule);
    return this;
  }

  /**
  * Calculates all possible movements for the current movement vector relative to the current square.
  */
  getPossibleMoves() {
    if (this.maximumRecurrences == 1) {
      return [this.movement]
    }
    const moves: TCoordinates[] = [];

    let start: TCoordinates = [0, 0]

    for (let i = 0; i < this.maximumRecurrences; i++) {
      start = this.getVectorTarget(start, this.movement)
      moves.push(start)
    }

    return moves;
  }

  getValidMoves(board: TBoard, currentLocation: TCoordinates) {

    const moves: TCoordinates[] = [];
    let isValid = true;

    for (const move of this.getPossibleMoves()) {
      for (const rule of this.rules) {
        rule.setBoard(board);
        rule.setPiece(currentLocation);
        if (!rule.isValid(move)) {
          isValid = false
          break;
        }
      }
      if (!isValid) {
        break;
      }
      moves.push(this.getVectorTarget(currentLocation, move))
    }

    return moves;
  }
}

export default Move;
