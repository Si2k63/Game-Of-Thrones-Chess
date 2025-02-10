import { TCoordinates, TPiece, TBoard, TPieceColour, TPieceName, TSkin } from '../Engine.types';
import Move from '../Move';

abstract class Piece implements TPiece {
    colour: TPieceColour = 'White'
    name: TPieceName = 'Pawn'
    skin: TSkin = 'Default';
    movements: Move[] = [];

    constructor(colour: TPieceColour, skin: TSkin = 'Default') {
        this.colour = colour;
        this.skin = skin;
    }

    getMoves(board: TBoard, coords: TCoordinates) {
        const available: TCoordinates[] = [];

        this.movements.forEach((move: Move) => {
            if (move.isValid(board, coords)) {
                available.push(move.getTargetTCoordinates(coords))
            }
        })

        return available;
    }
}

export default Piece;
