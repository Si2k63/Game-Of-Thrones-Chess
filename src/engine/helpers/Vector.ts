import { TBoard, TCoordinates, TSquare } from "../Engine.types";

class Vector {

  vector: TCoordinates[] = [];
  origin: TCoordinates = [0, 0];

  constructor(origin: TCoordinates, vector: TCoordinates[]) {
    this.origin = origin;
    this.vector = vector;
  }

  /**
  * Converts the vector to its absolute coordinates.
  */
  absolute() {
    // @TODO: sum coordinates together performed in several places - refactor.
    this.vector = this.vector.map(coordinate => [coordinate[0] + this.origin[0], coordinate[1] + this.origin[1]]);
  }

  /**
  * Converts the vector to its relative coordinates.
  */
  relative() {
    // @TODO: duplication of toAbsolute - refactor.
    this.vector = this.vector.map(coordinate => [coordinate[0] - this.origin[0], coordinate[1] - this.origin[1]]);
  }

  /**
  * Check if the vector contains a set of coordinates.
  *
  * @param coordinates - the coordinates to check
  */
  contains(coordinates: TCoordinates): boolean {
    return this.findIndex(coordinates) >= 0;
  }

  /**
  * Gets the index of a set of coordinates inside the vector.
  *
  * @param coordinates - the coordinates to check
  */
  findIndex(coordinates: TCoordinates): number {
    return this.vector.findIndex(square => square[0] == coordinates[0] && square[1] == coordinates[1]);
  }

  /**
  * Convert the vector to its board squares.
  *
  * @param board - the current board
  */
  pieces(board: TBoard): TSquare[] {
    return this.vector.map(coordinate => board[coordinate[0]][coordinate[1]])
  }

  /**
  * Slice the vector and return a new instance of it containing the new vector.
  *
  * @param start - the index to start the slice from
  * @param end - the index to stop the slice at
  */
  slice(start: number, end?: number): Vector {
    return new Vector(this.origin, this.vector.slice(start, end))
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
}

export default Vector;
