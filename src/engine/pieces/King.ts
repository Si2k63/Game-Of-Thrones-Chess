import Move from "../Move";
import { PieceName } from "../Engine.types";
import Piece from "./AbstractPiece";

class King extends Piece {
  name: PieceName ='King';
  movements: Move[] = [
    new Move([-1, -1]),
    new Move([-1, 0]),
    new Move([-1, 1]),
    new Move([0, 1]),
    new Move([0, -1]),
    new Move([1, -1]),
    new Move([1, 0]),
    new Move([1, 1]),
  ];
}

export default King;