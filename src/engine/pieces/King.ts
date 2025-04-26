import { TPieceName } from "@engine/Engine.types";
import Move from "../Move";
import Piece from "./AbstractPiece";
import IsAbleToCastle from "../rules/IsAbleToCastle";

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
    new Move([0, 1], 2).addRule(new IsAbleToCastle()),
    new Move([0, -1], 2).addRule(new IsAbleToCastle()),
  ];
}

export default King;
