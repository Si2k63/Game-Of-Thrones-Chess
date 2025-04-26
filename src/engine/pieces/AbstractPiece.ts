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

  getVectors(): Vector[] {
    const vectors: Vector[] = [];

    this.movements.forEach((move: Move) => {
      const possibleMoves = move.getPossibleMoves();
      const currentVector: TCoordinates[] = [];
      possibleMoves.forEach((mv) => {
        currentVector.push(mv);
      });
      vectors.push(new Vector(currentVector));
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
    return this.getVectors().map((vector: Vector) => {
      return vector
        .setOrigin(origin)
        .setBoard(board)
        .absolute()
        .insideBoard();
    }).filter((vector) => vector.contains(target)).pop();
  }

  getMoves(board: TBoard, coords: TCoordinates) {
    const available: TCoordinates[] = [];

    this.movements.forEach((move: Move) => {
      move.getValidMoves(board, coords).forEach((valid: TCoordinates) => {
        available.push(valid);
      });
    });
    return available;
  }
}

export default Piece;
