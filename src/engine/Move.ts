import Board from "./Board";
import { TCoordinates, TMove } from "./Engine.types";

class Move implements TMove {
  movement: TCoordinates = [0, 0];
  maximumRecurrences: number = 1;

  /**
   * @param movement relative TCoordinates to travel to.
   */
  constructor(movement: TCoordinates, maximumRecurrences: number = 1) {
    this.movement = movement;
    this.maximumRecurrences = maximumRecurrences;
  }

  getMovement(): TCoordinates {
    return this.movement;
  }

  getMaximumRecurrences(): number {
    return this.maximumRecurrences;
  }

}

export default Move;
