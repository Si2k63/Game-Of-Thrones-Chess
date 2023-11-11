import Move from "../Move";
import IsEnemyRule from "../rules/IsEnemyRule";
import isNullRule from "../rules/IsNullRule";
import IsObstructedRule from "../rules/IsObstructedRule";
import IsOnRowRule from "../rules/IsOnRowRule";
import { PieceColour, PieceName } from "../Engine.types";
import Piece from "./AbstractPiece";

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
      new Move([modifier * 2, 0]).addRule(new IsOnRowRule().setRow(colour === 'White' ? 6 : 1)).addRule(new IsObstructedRule()),
    ]
  }
}

export default Pawn;