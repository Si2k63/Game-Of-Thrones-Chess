import { TBoard, TCoordinates, TPiece } from "./Engine.types";
import King from "./pieces/King";

class Board {
    board: TBoard = [];
    activeColour: string = "White";
    taken: TPiece[] = [];

    constructor(board: TBoard) {
        this.board = board;
    }

    getBoard() {
        return this.board;
    }

    move = (from: TCoordinates, to: TCoordinates) => {
        if (
            this.board[to[0]][to[1]] !== null &&
            this.board[from[0]][from[1]]?.colour !==
            this.board[to[0]][to[1]]?.colour
        ) {
            this.taken.push(this.board[to[0]][to[1]] as TPiece);
            this.board[to[0]][to[1]] = null;
        }

        [this.board[from[0]][from[1]], this.board[to[0]][to[1]]] = [
            this.board[to[0]][to[1]],
            this.board[from[0]][from[1]],
        ];

        const movedPiece = this.board[to[0]][to[1]]
        movedPiece?.setHasMoved();

        if (this.castleKing(from, to)) {
            return;
        }

        this.activeColour = this.activeColour == "White" ? "Black" : "White";

    };

    castleKing(from: TCoordinates, to: TCoordinates) {

        const movedPiece = this.board[to[0]][to[1]]

        if (movedPiece instanceof King === false) {
            return false;
        }

        if (from[0] - to[0] !== 0) {
            return false;
        }

        const netHorizontal = to[1] - from[1];

        if (![-2, 2].includes(netHorizontal)) {
            return false;
        }

        this.move([from[0], netHorizontal > 0 ? 7 : 0], [from[0], netHorizontal > 0 ? 5 : 3]);
        return true;
    }

    getPiece(coords: TCoordinates) {
        return this.board[coords[0]][coords[1]];
    }

    getTaken() {
        return this.taken;
    }

    getAvailableSquares(coords: TCoordinates) {
        const piece = this.board[coords[0]][coords[1]];

        if (!piece || piece.colour !== this.activeColour) {
            return [];
        }

        const moves = piece.getMoves(this.board, coords, true);
        return moves;
    }
}

export default Board;
