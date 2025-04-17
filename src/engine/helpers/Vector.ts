import { TBoard, TCoordinates, TPieceColour, TPieceName, TSquare } from "../Engine.types";

class Vector {

  vector: TCoordinates[] = [];
  origin: TCoordinates = [0, 0];
  board: TBoard = [];

  constructor(vector: TCoordinates[]) {
    this.vector = vector;
  }

  setOrigin(origin: TCoordinates) {
    this.origin = origin;
    return this;
  }

  setBoard(board: TBoard) {
    this.board = board;
    return this;
  }

  /**
  * Converts the vector to its absolute coordinates.
  */
  absolute(): Vector {
    // @TODO: sum coordinates together performed in several places - refactor.
    this.vector = this.vector.map(coordinate => [coordinate[0] + this.origin[0], coordinate[1] + this.origin[1]]);
    return this;
  }

  /**
  * Converts the vector to its relative coordinates.
  */
  relative(): Vector {
    // @TODO: duplication of toAbsolute - refactor.
    this.vector = this.vector.map(coordinate => [coordinate[0] - this.origin[0], coordinate[1] - this.origin[1]]);
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

  /**
  * Gets the index of a set of coordinates inside the vector.
  *
  * @param coordinates - the coordinates to check
  */
  findIndex(coordinates: TCoordinates): number {
    return this.vector.findIndex(square => square[0] == coordinates[0] && square[1] == coordinates[1]);
  }

  /**
  * Converts an absolute vector to its board squares.
  *
  * @param board - the current board
  */
  pieces(): TSquare[] {
    this.pieceChecks('pieces');
    return this.vector.map(coordinate => this.board[coordinate[0]][coordinate[1]])
  }

  /**
  * Slice the vector and return a new instance of it containing the new vector.
  *
  * @param start - the index to start the slice from
  * @param end - the index to stop the slice at
  */
  slice(start: number, end?: number): Vector {
    const vector = new Vector(this.vector.slice(start, end))
    vector.setBoard(this.board)
    vector.setOrigin(this.origin);
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

  private pieceChecks(name: string) {
    if (this.board.length < 1) {
      throw new Error(`Cannot call method ${name}() without calling setBoard() first.`)
    }
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
    this.pieceChecks('isEmpty');
    return this.pieces().filter(x => x !== null).length == 0
  }

  containsPiece(name: TPieceName, colour: TPieceColour): boolean {
    this.pieceChecks('containsPiece');

    return this.pieces()
      .findIndex(square => square?.name == name && square?.colour == colour) >= 0
  }

  endsWith(coordinates: TCoordinates): boolean {
    if (this.vector.length == 0) {
      return false;
    }
    return this.findIndex(coordinates) == this.vector.length - 1;
  }

  push(coordinates: TCoordinates) {
    this.vector.push(coordinates);
  }

  insideBoard() {
    this.pieceChecks('insideBoard');
    this.vector = this.vector.filter(target => target[0] >= 0 && target[1] >= 0 && target[0] < this.board.length && target[1] < this.board[0].length)
    console.log(this.vector)
    return this;
  }

  length() {
    return this.vector.length;
  }

  firstPiece() {
    return this.pieces().find(x => x !== null)
  }
}

export default Vector;
