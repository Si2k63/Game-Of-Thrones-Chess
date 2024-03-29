import { TPieceColour, TPieceName, TSkin } from '../Engine.types';
import Move from '../Move';
import Piece from './AbstractPiece';

class Queen extends Piece {
    name: TPieceName = 'Queen';
    movements: Move[] = [];

    constructor(colour: TPieceColour, skin: TSkin = 'Default') {
        super(colour, skin);

        for (let i = 1; i <= 7; i++) {
            this.movements.push(new Move([i * -1, i * -1]))
            this.movements.push(new Move([i * -1, 0]))
            this.movements.push(new Move([i * -1, i]))
            this.movements.push(new Move([0, i]))
            this.movements.push(new Move([0, i * -1]))
            this.movements.push(new Move([i, i * -1]))
            this.movements.push(new Move([i, 0]))
            this.movements.push(new Move([i, i]))
        }
    }
}

export default Queen;