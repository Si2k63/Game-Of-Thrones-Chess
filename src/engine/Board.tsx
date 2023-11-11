import { defaultBoard } from './helpers/board';
import Move from './Move';
import { TBoard, TCoordinates } from './Engine.types';

class Board {

  board: TBoard = []

  constructor(board: TBoard) {
    this.board = board;
  }

  getBoard() {
    return this.board;
  }
  
  move = (from: TCoordinates, to: TCoordinates) => {
    let fromPiece = this.board[from[0]][from[1]];
    let toPiece = this.board[to[0]][to[1]];
    
    if (fromPiece?.colour !== toPiece?.colour) {
      toPiece = null;
    }

    [fromPiece, toPiece] = [ toPiece, fromPiece ]
  }

  getAvailableSpaces(pieceTCoordinates: TCoordinates) {

    const piece = this.board[pieceTCoordinates[0]][pieceTCoordinates[1]];
    const available: number[][] = [];
    
    if (!piece) {
      return [];
    }

    piece.getMoves().forEach((move: Move) => {
      const isValid = move.isValid(this.board, pieceTCoordinates);
        if (isValid) {
          available.push(move.getTargetTCoordinates(pieceTCoordinates))
        }
    })
    
    return available;
  }
}

const board = new Board(defaultBoard);
export default board;