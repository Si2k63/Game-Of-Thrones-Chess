import Move from '../Move';
import IsEnemyRule from '../Rules/IsEnemyRule';
import isNullRule from '../Rules/IsNullRule';
import IsObstructedRule from '../Rules/IsObstructedRule';
import IsOnRowRule from '../Rules/IsOnRowRule';
import { PieceColour, PieceName } from '../Engine.types';
import Piece from './AbstractPiece';

class Pawn extends Piece {
  name: PieceName ='Pawn';
  movements: Move[] = [];

  constructor(colour: PieceColour) {
    super(colour);
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