import { PieceColour, PieceName, TPiece, TSkin } from '../Engine.types';
import Move from '../Move';

abstract class Piece implements TPiece {
    colour: PieceColour = 'White'
    name: PieceName = 'Pawn'
    skin: TSkin = 'Default';
    movements: Move[] = [];

    constructor(colour: PieceColour, skin: TSkin = 'Default') {
        this.colour = colour;
        this.skin = skin;
    }

    getMoves() {
        return this.movements;
    }
}

export default Piece;