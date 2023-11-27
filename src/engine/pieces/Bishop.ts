import Move from '../Move';
import { PieceName } from '../Engine.types';
import Piece from './AbstractPiece';

class Bishop extends Piece {
    name: PieceName = 'Bishop';
    movements: Move[] = [
        new Move([-1, -1]),
        new Move([-2, -2]),
        new Move([-3, -3]),
        new Move([-4, -4]),
        new Move([-5, -5]),
        new Move([-6, -6]),
        new Move([-7, -7]),
        new Move([1, 1]),
        new Move([2, 2]),
        new Move([3, 3]),
        new Move([4, 4]),
        new Move([5, 5]),
        new Move([6, 6]),
        new Move([7, 7]),
        new Move([-1, 1]),
        new Move([-2, 2]),
        new Move([-3, 3]),
        new Move([-4, 4]),
        new Move([-5, 5]),
        new Move([-6, 6]),
        new Move([-7, 7]),
        new Move([1, -1]),
        new Move([2, -2]),
        new Move([3, -3]),
        new Move([4, -4]),
        new Move([5, -5]),
        new Move([6, -6]),
        new Move([7, -7]),
    ];
}

export default Bishop;