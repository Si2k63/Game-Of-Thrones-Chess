import { TPieceColour, TPieceName, TSkin } from '../Engine.types';
import Move from '../Move';
import IsEnemyRule from '../rules/IsEnemyRule';
import isNullRule from '../rules/IsNullRule';
import IsObstructedRule from '../rules/IsObstructedRule';
import IsOnRowRule from '../rules/IsOnRowRule';
import Piece from './AbstractPiece';

class Pawn extends Piece {
    name: TPieceName = 'Pawn';
    movements: Move[] = [];

    constructor(colour: TPieceColour, skin: TSkin = 'Default') {
        super(colour, skin);
        this.skin = 'Default'
        const modifier = colour === 'White' ? -1 : 1
        this.movements = [
            new Move([modifier, 0]).addRule(new isNullRule()),
            new Move([modifier, -1]).addRule(new IsEnemyRule()),
            new Move([modifier, 1]).addRule(new IsEnemyRule()),
            new Move([modifier * 2, 0])
                .addRule(new IsOnRowRule().setRow(colour === 'White' ? 6 : 1))
                .addRule(new IsObstructedRule())
                .addRule(new isNullRule()),
        ]
    }
}

export default Pawn;