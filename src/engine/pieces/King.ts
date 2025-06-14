import { TPieceName } from "@engine/Engine.types";
import Move from "../Move";
import Piece from "./AbstractPiece";

class King extends Piece {
  name: TPieceName = "King";
  movements: Move[] = [
    new Move([-1, -1]),
    new Move([-1, 0]),
    new Move([-1, 1]),
    new Move([0, 1]),
    new Move([0, -1]),
    new Move([1, -1]),
    new Move([1, 0]),
    new Move([1, 1]),
    new Move([0, 1], 2),
    new Move([0, -1], 2)
  ];
}

export default King;
