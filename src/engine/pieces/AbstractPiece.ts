import {
  TBoard,
  TCoordinates,
  TPiece,
  TPieceColour,
  TPieceName,
  TSkin,
} from "../Engine.types";
import Vector from "../helpers/Vector";
import Move from "../Move";

abstract class Piece implements TPiece {
  colour: TPieceColour = "White";
  name: TPieceName = "Pawn";
  skin: TSkin = "Default";
  movements: Move[] = [];
  hasMoved: boolean = false;

  constructor(colour: TPieceColour, skin: TSkin = "Default") {
    this.colour = colour;
    this.skin = skin;
  }

  getVectors(origin: TCoordinates, board: TBoard): Vector[] {
    const vectors: Vector[] = [];

    this.movements.forEach((move: Move) => {
      const possibleMoves = move.getPossibleMoves();
      const currentVector: TCoordinates[] = [];
      possibleMoves.forEach((mv) => {
        currentVector.push(mv);
      });
      vectors.push(new Vector(currentVector, origin, board));
    });

    return vectors;
  }

  setHasMoved() {
    this.hasMoved = true;
  }

  getIntersectingVector(
    target: TCoordinates,
    origin: TCoordinates,
    board: TBoard,
  ): Vector | undefined {
    return this.getVectors(origin, board)
      .map((vector: Vector) => {
        return vector.absolute().insideBoard();
      })
      .filter((vector) => vector.contains(target))
      .pop();
  }

  getMoves(): Move[] {
    return this.movements;
  }
}

export default Piece;
