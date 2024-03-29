import { TBoard, TCoordinates, TPiece } from './Engine.types';
import Move from './Move';

class Board {

    board: TBoard = []
    activeColour: string = 'White';
    taken: TPiece[] = [
    ];

    constructor(board: TBoard) {
        this.board = board;
    }

    getBoard() {
        return this.board;
    }

    move = (from: TCoordinates, to: TCoordinates) => {
        if (this.board[to[0]][to[1]] !== null && this.board[from[0]][from[1]]?.colour !== this.board[to[0]][to[1]]?.colour) {
            this.taken.push(this.board[to[0]][to[1]] as TPiece);
            this.board[to[0]][to[1]] = null;
        }

        [this.board[from[0]][from[1]], this.board[to[0]][to[1]]] = [this.board[to[0]][to[1]], this.board[from[0]][from[1]]]

        this.activeColour = this.activeColour == 'White' ? 'Black' : 'White';
    }

    getPiece(coords: TCoordinates) {
        return this.board[coords[0]][coords[1]];
    }

    getTaken() {
        return this.taken;
    }

    getAvailableSquares(coords: TCoordinates) {
        const piece = this.board[coords[0]][coords[1]];
        const available: TCoordinates[] = [];

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