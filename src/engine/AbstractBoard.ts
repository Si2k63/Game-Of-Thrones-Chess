import {
  TAbstractBoard,
  TBoard,
  TBoardPiece,
  TCoordinates,
  TMove,
  TMovementRule,
  TPiece,
  TSquare,
} from "./Engine.types";
import Vector from "./helpers/Vector";
import Move from "./Move";

abstract class AbstractBoard implements TAbstractBoard {
  board: TBoard = [];
  rules: TMovementRule[] = [];
  moved: TPiece[] = [];

  constructor(board: TBoard) {
    this.board = board;
  }

  /**
   * Checks whether the given coordinates fall within the confines of the board.
   *
   * @param targetCoordinates - The coordinates to check.
   *
   * @returns True if the coordinates exist within the current board.
   */
  contains(targetCoordinates: TCoordinates): boolean {
    return (
      targetCoordinates[0] >= 0 &&
      targetCoordinates[0] < this.board.length &&
      targetCoordinates[1] >= 0 &&
      targetCoordinates[1] < this.board[0].length
    );
  }

  /**
  * Moves a piece on the board from one coordinate to another.
  *
  * @param from - The piece's current coordinates.
  * @param to - The piece's target coordinates.
  *
  */
  move(from: TCoordinates, to: TCoordinates): void {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const piece = this.getPiece(from);

    if (!piece) {
      return;
    }

    const newBoard = [...this.board];

    newBoard[fromRow] = [...newBoard[fromRow]];
    newBoard[fromRow][fromCol] = null;
    newBoard[toRow] = [...newBoard[toRow]];
    newBoard[toRow][toCol] = piece;
    this.board = newBoard;

    if (!this.moved.includes(piece)) {
      this.moved.push(piece);
    }
  }

  /**
   * Determines if the piece at the given coordinates has moved during the current game.
   *
   * @param coordinates - The coordinates of the piece in question.
   *
   * @returns True if the piece has moved.
   */
  hasPieceMoved(coordinates: TCoordinates): boolean {
    const piece = this.getPiece(coordinates);

    if (!piece) {
      return false;
    }

    return this.moved.includes(piece);
  }

  /**
   * @returns The current board array.
   */
  getBoard(): TBoard {
    return this.board;
  }

  /**
  * Adds a new MovementRule to the rules array to be checked when determining available moves.
  *
  * @param rule - An instance of TMovementRule.
  *
  * @returns The instance of this class (for chaining purposes).
  */
  addRule(rule: TMovementRule): TAbstractBoard {
    this.rules.push(rule);
    return this;
  }

  /**
   * Retrieves a piece at the given coordinates.
   *
   * @param coordinates - The coordinates of the piece to retrieve.
   *
   * @returns The contents of the square at the given coordinates.
   */
  getPiece(coordinates: TCoordinates): TSquare {
    return this.board[coordinates[0]][coordinates[1]];
  }

  /**
  * Iterates through the current board to retrieve its pieces.
  *
  * @yields {TBoardPiece} An object containing the piece's coordinates and an instance of each TSquare..
  */
  *getPieces(): Generator<TBoardPiece> {
    for (const [rowIndex, row] of this.board.entries()) {
      for (const [columnIndex, piece] of row.entries()) {
        if (!piece) {
          continue;
        }
        yield { rowIndex, columnIndex, piece };
      }
    }
  }

  /**
  * Calculates the absolute coordinates of a pair of absolute coordinates and relative coordinates.
  *
  * @param current - The absolute coordinates.
  * @param vector - The relative coordinates.
  *
  * @returns The derived new coordinates.
  */
  getAbsoluteCoordinates(
    current: TCoordinates,
    vector: TCoordinates,
  ): TCoordinates {
    return [current[0] + vector[0], current[1] + vector[1]];
  }

  /**
  * Calculates all possible coordinates for the given Movement vector.
  *
  * @param move - The Movement vector to calculate for.
  *
  * @returns The array of TCoordinates for the supplied vector.
  */
  getPossibleMoves(move: TMove): TCoordinates[] {
    const maximumRecurrences = move.getMaximumRecurrences();
    const target = move.getMovement();
    if (maximumRecurrences === 1) {
      return [target];
    }
    const moves: TCoordinates[] = [];

    let start: TCoordinates = [0, 0];

    for (let i = 0; i < maximumRecurrences; i++) {
      start = this.getAbsoluteCoordinates(start, target);
      moves.push(start);
    }

    return moves;
  }

  getVectors(coordinates: TCoordinates): Vector[] {
    const vectors: Vector[] = [];
    const piece = this.getPiece(coordinates);

    if (!piece) {
      return vectors;
    }

    piece.getMoves().forEach((move: Move) => {
      const possibleMoves = this.getPossibleMoves(move);
      const currentVector: TCoordinates[] = [];
      possibleMoves.forEach((mv) => {
        currentVector.push(mv);
      });
      vectors.push(new Vector(currentVector, coordinates, this.getBoard()));
    });

    return vectors;
  }

  getIntersectingVector(
    target: TCoordinates,
    origin: TCoordinates,
  ): Vector | undefined {
    return this.getVectors(origin)
      .map((vector: Vector) => {
        return vector.absolute().insideBoard();
      })
      .filter((vector) => vector.contains(target))
      .pop();
  }
}

export default AbstractBoard;
