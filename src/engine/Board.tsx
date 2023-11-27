import { defaultBoard } from './Helpers/board';
import Move from './Move';
import { TBoard, TCoordinates } from './Engine.types';

class Board {

  board: TBoard = []
  activeColour: string = 'White';

  constructor(board: TBoard) {
    this.board = board;
  }

  getBoard() {
    return this.board;
  }

  move = (from: TCoordinates, to: TCoordinates) => {
    if (this.board[from[0]][from[1]]?.colour !== this.board[to[0]][to[1]]?.colour) {
      this.board[to[0]][to[1]] = null;
    }

    [
      this.board[from[0]][from[1]],
      this.board[to[0]][to[1]],
    ] =
    [
      this.board[to[0]][to[1]],
      this.board[from[0]][from[1]],
    ]

    this.activeColour = this.activeColour == 'White' ? 'Black' : 'White';
  }

  getAvailableSpaces(coords: TCoordinates) {
    const piece = this.board[coords[0]][coords[1]];
    const available: TCoordinates[] = [];
    
    console.log(piece);
    
    if (!piece || piece.colour !== this.activeColour) {
      return [];
    }

    piece.getMoves().forEach((move: Move) => {
      const isValid = move.isValid(this.board, coords);
        if (isValid) {
          available.push(move.getTargetTCoordinates(coords))
        }
    })
    
    return available;
  }
}

export default Board;