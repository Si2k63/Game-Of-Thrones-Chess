import { TPieceColour, TPieceName, TSkin } from "../Engine.types";
import Move from "../Move";
import Piece from "./AbstractPiece";

class Pawn extends Piece {
  name: TPieceName = "Pawn";
  movements: Move[] = [];

  constructor(colour: TPieceColour, skin: TSkin = "Default") {
    super(colour, skin);
    this.skin = "Default";
    const modifier = colour === "White" ? -1 : 1;
    this.movements = [
      new Move([modifier, 0]),
      new Move([modifier, -1]),
      new Move([modifier, 1]),
      new Move([modifier, 0], 2),
    ];
  }
}

export default Pawn;
