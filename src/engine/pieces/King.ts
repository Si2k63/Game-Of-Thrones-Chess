import { TPieceName } from '@engine/Engine.types';
import Move from '../Move';
import Piece from './AbstractPiece';

class King extends Piece {
    name: TPieceName = 'King';
    movements: Move[] = [
        new Move([-1, -1]),
        new Move([-1, 0]),
        new Move([-1, 1]),
        new Move([0, 1]),
        new Move([0, -1]),
        new Move([1, -1]),
        new Move([1, 0]),
        new Move([1, 1]),
    ];
}

export default King;