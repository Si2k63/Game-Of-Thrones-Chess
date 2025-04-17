import { TCoordinates, TPiece, TBoard, TPieceColour, TPieceName, TSkin } from '../Engine.types';
import Vector from '../helpers/Vector';
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

    getVectors() {
        const vectors: TCoordinates[][] = [];

        this.movements.forEach((move: Move) => {
            const possibleMoves = move.getPossibleMoves();
            const currentVector: TCoordinates[] = [];
            possibleMoves.forEach(mv => {
                currentVector.push(mv)
            })
            vectors.push(currentVector);
        })

        return vectors.map(vector => new Vector(vector));
    }

    getIntersectingVector(target: TCoordinates, origin: TCoordinates, board: TBoard) {
        return this.getVectors().map(vector => {
            return vector
                .setOrigin(origin)
                .setBoard(board)
                .absolute()
                .insideBoard();
        }).filter(vector => vector.contains(target)).pop();
    }

    getMoves(board: TBoard, coords: TCoordinates) {
        const available: TCoordinates[] = [];

        this.movements.forEach((move: Move) => {
            move.getValidMoves(board, coords).forEach((valid: TCoordinates) => {
                available.push(valid)
            });
        })

        return available;
    }
}

export default Piece;
