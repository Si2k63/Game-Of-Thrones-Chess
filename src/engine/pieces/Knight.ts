import { TPieceName } from '../Engine.types';
import Move from '../Move';
import Piece from './AbstractPiece';

class Knight extends Piece {
    name: TPieceName = 'Knight';
    movements: Move[] = [
        new Move([-2, -1]),
        new Move([-2, 1]),
        new Move([-1, 2]),
        new Move([-1, -2]),
        new Move([1, -2]),
        new Move([1, 2]),
        new Move([2, 1]),
        new Move([2, -1]),
    ];
}

export default Knight;
