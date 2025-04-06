import { TPieceColour, TPieceName, TSkin } from '../Engine.types';
import Move from '../Move';
import Piece from './AbstractPiece';

class Queen extends Piece {
    name: TPieceName = 'Queen';
    movements: Move[] = [
        new Move([-1, -1], 7),
        new Move([-1, 0], 7),
        new Move([-1, 1], 7),
        new Move([0, 1], 7),
        new Move([0, -1], 7),
        new Move([1, -1], 7),
        new Move([1, 0], 7),
        new Move([1, 1], 7),
    ];
}

export default Queen;
