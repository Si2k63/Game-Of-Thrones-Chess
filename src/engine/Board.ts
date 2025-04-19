import { MoveResult, TBoard, TCoordinates, TPiece } from "./Engine.types";
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

    move = (from: TCoordinates, to: TCoordinates): MoveResult => {
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
            return this.checkResult();
        }

        this.activeColour = this.activeColour == "White" ? "Black" : "White";

        return this.checkResult();

    };

    checkResult(): MoveResult {
        const result = {
            checkmate: this.isCheck() && !this.hasMoves(),
            stalemate: !this.isCheck() && !this.hasMoves(),
            winner: this.activeColour == "White" ? "Black" : "White"
        }

        return result;
    }

    isCheck(): boolean {

        let kingCoordinates: TCoordinates = [0, 0];

        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, _] of row.entries()) {

                const piece = this.board[rowIndex][columnIndex]

                if (!piece) {
                    continue;
                }

                if (piece.colour !== this.activeColour) {
                    continue;
                }

                if (piece instanceof King === false) {
                    continue;
                }

                kingCoordinates = [rowIndex, columnIndex];
            }
        }

        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, _] of row.entries()) {
                const enemy = this.board[rowIndex][columnIndex]
                if (!enemy) {
                    continue;
                }

                if (enemy.colour == this.activeColour) {
                    continue;
                }

                const intersectingVector = enemy.getIntersectingVector(kingCoordinates, [rowIndex, columnIndex], this.board)

                if (!intersectingVector) {
                    continue;
                }

                const between = intersectingVector
                    .before(kingCoordinates)

                if (between.isEmpty()) {
                    return true;
                }
            }
        }

        return false;

    }

    hasMoves(): boolean {
        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, enemy] of row.entries()) {
                const piece = this.board[rowIndex][columnIndex]
                if (!piece) {
                    continue;
                }

                if (piece.colour !== this.activeColour) {
                    continue;
                }

                const moves = piece.getMoves(this.board, [rowIndex, columnIndex])

                if (moves.length > 0) {
                    return true;
                }

            }
        }

        return false;

    }

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

        return this.move([from[0], netHorizontal > 0 ? 7 : 0], [from[0], netHorizontal > 0 ? 5 : 3]);
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

        const moves = piece.getMoves(this.board, coords);
        return moves;
    }
}

export default Board;
