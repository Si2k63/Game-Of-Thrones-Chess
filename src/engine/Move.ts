import Board from "./Board";
import { TCoordinates } from "./Engine.types";

interface MoveInterface {
  movement: TCoordinates;
  maximumRecurrences: number;
}

class Move implements MoveInterface {
  movement: TCoordinates = [0, 0];
  maximumRecurrences: number = 1;

  /**
   * @param movement relative TCoordinates to travel to.
   */
  constructor(movement: TCoordinates, maximumRecurrences: number = 1) {
    this.movement = movement;
    this.maximumRecurrences = maximumRecurrences;
  }

  /**
   * Calculates all possible movements for the current movement vector relative to the current square.
   */
  getPossibleMoves() {
    if (this.maximumRecurrences == 1) {
      return [this.movement];
    }
    const moves: TCoordinates[] = [];

    let start: TCoordinates = [0, 0];

    for (let i = 0; i < this.maximumRecurrences; i++) {
      start = Board.getAbsoluteCoordinates(start, this.movement);
      moves.push(start);
    }

    return moves;
  }
}

export default Move;
