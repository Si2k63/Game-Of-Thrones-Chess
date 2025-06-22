import {
  TBoard,
  TCoordinates,
  TPieceColour,
  TPieceName,
  TSquare,
} from "../Engine.types";

class Vector {
  vector: TCoordinates[] = [];
  origin: TCoordinates = [0, 0];
  board: TBoard = [];

  constructor(vector: TCoordinates[], origin: TCoordinates, board: TBoard) {
    this.vector = vector;
    this.board = board;
    this.origin = origin;
  }

  /**
   * Converts the vector to its absolute coordinates.
   */
  absolute(): Vector {
    // @TODO: sum coordinates together performed in several places - refactor.
    this.vector = this.vector.map((coordinate) => [
      coordinate[0] + this.origin[0],
      coordinate[1] + this.origin[1],
    ]);
    return this;
  }

  /**
   * Converts the vector to its relative coordinates.
   */
  relative(): Vector {
    // @TODO: duplication of toAbsolute - refactor.
    this.vector = this.vector.map((coordinate) => [
      coordinate[0] - this.origin[0],
      coordinate[1] - this.origin[1],
    ]);
    return this;
  }

  /**
   * Check if the vector contains a set of coordinates.
   *
   * @param coordinates - the coordinates to check
   */
  contains(coordinates: TCoordinates): boolean {
    return this.findIndex(coordinates) >= 0;
  }

  containsAny(coordinates: TCoordinates[]): boolean {
    for (const vector of this.vector) {
      for (const coordinate of coordinates) {
        if (coordinate[0] == vector[0] && coordinate[1] == vector[1]) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Gets the index of a set of coordinates inside the vector.
   *
   * @param coordinates - the coordinates to check
   */
  findIndex(coordinates: TCoordinates): number {
    return this.vector.findIndex(
      (square) => square[0] == coordinates[0] && square[1] == coordinates[1],
    );
  }

  /**
   * Converts an absolute vector to its board squares.
   *
   * @param board - the current board
   */
  pieces(): TSquare[] {
    return this.vector.map(
      (coordinate) => this.board[coordinate[0]][coordinate[1]],
    );
  }

  /**
   * Slice the vector and return a new instance of it containing the new vector.
   *
   * @param start - the index to start the slice from
   * @param end - the index to stop the slice at
   */
  slice(start: number, end?: number): Vector {
    const vector = new Vector(
      this.vector.slice(start, end),
      this.origin,
      this.board,
    );
    return vector;
  }

  /**
   * Slice the vector and return a new instance containing all coordinates before the specified coordinates.
   *
   * @param coordinates - the coordinates to slice before.
   */
  before(coordinates: TCoordinates): Vector {
    const index = this.findIndex(coordinates);
    return this.slice(0, index);
  }

  /**
   * Slice the vector and return a new instance containing all coordinates after the specified coordinates.
   *
   * @param coordinates - the coordinates to slice before.
   */
  after(coordinates: TCoordinates): Vector {
    const index = this.findIndex(coordinates);
    return this.slice(index);
  }

  isEmpty(): boolean {
    return this.pieces().filter((x) => x !== null).length == 0;
  }

  containsPiece(name: TPieceName, colour: TPieceColour): boolean {
    return (
      this.pieces().findIndex(
        (square) => square?.name == name && square?.colour == colour,
      ) >= 0
    );
  }

  endsWith(coordinates: TCoordinates): boolean {
    if (this.vector.length == 0) {
      return false;
    }
    return this.findIndex(coordinates) == this.vector.length - 1;
  }

  push(coordinates: TCoordinates) {
    this.vector.push(coordinates);
    return this;
  }

  insideBoard() {
    this.vector = this.vector.filter(
      (target) =>
        target[0] >= 0 &&
        target[1] >= 0 &&
        target[0] < this.board.length &&
        target[1] < this.board[0].length,
    );
    return this;
  }

  length() {
    return this.vector.length;
  }

  firstPiece() {
    return this.pieces().find((x) => x !== null);
  }
}

export default Vector;
