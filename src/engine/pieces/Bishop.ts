import { TPieceName } from "@engine/Engine.types";
import Move from "../Move";
import Piece from "./AbstractPiece";

class Bishop extends Piece {
  name: TPieceName = "Bishop";
  movements: Move[] = [
    new Move([-1, -1], 7),
    new Move([1, 1], 7),
    new Move([-1, 1], 7),
    new Move([1, -1], 7),
  ];
}

export default Bishop;
