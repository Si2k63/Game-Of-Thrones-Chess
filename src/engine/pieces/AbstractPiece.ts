import Move from "../Move";
import { PieceColour, PieceName, TPiece } from "../Engine.types";

abstract class Piece implements TPiece {
    colour: PieceColour = 'White'
    name: PieceName = 'Pawn'
    movements: Move[] = [];
    
    constructor(colour: PieceColour) {
      this.colour = colour;
    }

    getMoves() {
        return this.movements;
    }
  }
  
export default Piece;