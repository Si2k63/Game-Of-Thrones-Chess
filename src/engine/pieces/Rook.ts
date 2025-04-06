import { TPieceName } from '../Engine.types';
import Move from '../Move';
import Piece from './AbstractPiece';

class Rook extends Piece {
    name: TPieceName = 'Rook';
    movements: Move[] = [
        new Move([-1, 0], 7),
        new Move([1, 0], 7),
        new Move([0, -1], 7),
        new Move([0, 1], 7)
    ];
}

export default Rook;
