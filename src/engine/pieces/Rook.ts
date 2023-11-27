import Move from '../Move';
import { PieceName } from '../Engine.types';
import Piece from './AbstractPiece';

class Rook extends Piece {
    name: PieceName = 'Rook';
    movements: Move[] = [
        new Move([-1, 0]),
        new Move([-2, 0]),
        new Move([-3, 0]),
        new Move([-4, 0]),
        new Move([-5, 0]),
        new Move([-6, 0]),
        new Move([-7, 0]),
        new Move([1, 0]),
        new Move([2, 0]),
        new Move([3, 0]),
        new Move([4, 0]),
        new Move([5, 0]),
        new Move([6, 0]),
        new Move([7, 0]),
        new Move([0, -1]),
        new Move([0, -2]),
        new Move([0, -3]),
        new Move([0, -4]),
        new Move([0, -5]),
        new Move([0, -6]),
        new Move([0, -7]),
        new Move([0, 1]),
        new Move([0, 2]),
        new Move([0, 3]),
        new Move([0, 4]),
        new Move([0, 5]),
        new Move([0, 6]),
        new Move([0, 7]),
    ];
}

export default Rook;