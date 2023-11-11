import Move from "../Move";
import { PieceColour, PieceName } from "../Engine.types";
import Piece from "./AbstractPiece";

class Queen extends Piece {
  name: PieceName ='Queen';
  movements: Move[] = [];

  constructor(colour: PieceColour) {
    super(colour);

    for (let i = 1; i <= 7; i++) {
      this.movements.push(new Move([i * -1, i * -1]))
      this.movements.push(new Move([i * -1, 0]))
      this.movements.push(new Move([i * -1, i]))
      this.movements.push(new Move([0, i]))
      this.movements.push(new Move([0, i * -1]))
      this.movements.push(new Move([i, i * -1]))
      this.movements.push(new Move([i, 0]))
      this.movements.push(new Move([i, i]))
    }
  }
}

export default Queen;