import {
  TPiece,
  TPieceColour,
  TPieceName,
  TSkin,
} from "../Engine.types";
import Move from "../Move";

abstract class Piece implements TPiece {
  colour: TPieceColour = "White";
  name: TPieceName = "Pawn";
  skin: TSkin = "Default";
  movements: Move[] = [];

  constructor(colour: TPieceColour, skin: TSkin = "Default") {
    this.colour = colour;
    this.skin = skin;
  }

  getMoves(): Move[] {
    return this.movements;
  }
}

export default Piece;
