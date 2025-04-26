import { MoveResult, TBoard, TCoordinates, TPiece, TPieceColour, TPieceName, TSquare } from "./Engine.types";
import King from "./pieces/King";

class Board {
    board: TBoard = [];
    activeColour: TPieceColour = "White";
    taken: TPiece[] = [];

    constructor(board: TBoard) {
        this.board = board;
    }

    getBoard() {
        return this.board;
    }

    reset(board: TBoard) {
        this.activeColour = "White";
        this.board = board;
        this.taken = [];
    }

    move(from: TCoordinates, to: TCoordinates): MoveResult {
        this.board = this.board.map((row, rowIndex) =>
            rowIndex === from[0] || rowIndex === to[0]
                ? row.map((cell, colIndex) => {
                    if (rowIndex === from[0] && colIndex === from[1]) return null;
                    if (rowIndex === to[0] && colIndex === to[1]) return this.board[from[0]][from[1]];
                    return cell;
                })
                : row
        )

        const movedPiece = this.board[to[0]][to[1]]
        movedPiece?.setHasMoved();

        if (this.castleKing(from, to)) {
            this.changeActiveColour();
            return this.checkResult();
        }


        return this.checkResult();

    };

    changeActiveColour() {
        this.activeColour = this.activeColour == "White" ? "Black" : "White";
    }

    /*
    * @TODO: There's too much repetition in this class - needs refactoring - board iterator?
    */
    promote(replacement: TSquare) {

        const indexes = [0, this.board.length - 1];
        for (const index of indexes) {
            for (const [columnIndex, piece] of this.board[index].entries()) {

                if (!piece) {
                    continue;
                }

                console.log(piece)

                if (piece.colour !== this.activeColour && piece.name === 'Pawn') { // already switched after completion of move.
                    console.log('test')
                    this.board[index][columnIndex] = replacement;
                }
            }
        }
    }

    canPromote(): boolean {
        const indexes = [0, this.board.length - 1];

        for (const index of indexes) {
            for (const piece of this.board[index]) {

                if (!piece) {
                    continue;
                }

                if (piece.colour === this.activeColour && piece.name === 'Pawn') {
                    return true;
                }
            }
        }

        return false;
    }

    checkResult(): MoveResult {
        const result = {
            checkmate: this.isCheck() && !this.hasMoves(),
            stalemate: !this.isCheck() && !this.hasMoves(),
            canPromote: this.canPromote(),
            previous: (this.activeColour == "White" ? "Black" : "White" as TPieceColour),
            current: this.activeColour
        }

        this.changeActiveColour();

        return result;
    }

    findPiece(name: TPieceName, colour: TPieceColour): TCoordinates | undefined {
        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, _] of row.entries()) {

                const piece = this.board[rowIndex][columnIndex]

                if (!piece) {
                    continue;
                }

                if (piece.colour !== colour) {
                    continue;
                }

                if (piece.name !== name) {
                    continue;
                }

                return [rowIndex, columnIndex];
            }
        }
    }

    isCheck(): boolean {
        const kingCoordinates = this.findPiece("King", this.activeColour == "White" ? "Black" : "White");

        console.log("King", kingCoordinates)

        if (!kingCoordinates) {
            return false;
        }

        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, _] of row.entries()) {
                const enemy = this.board[rowIndex][columnIndex]
                if (!enemy) {
                    continue;
                }

                if (enemy.colour !== this.activeColour) {
                    continue;
                }

                const intersectingVector = enemy.getIntersectingVector(kingCoordinates, [rowIndex, columnIndex], this.board)

                if (!intersectingVector) {
                    continue;
                }


                const between = intersectingVector
                    .before(kingCoordinates)

                console.log(enemy.colour, enemy.name, between.pieces())

                if (between.isEmpty()) {
                    return true;
                }
            }
        }

        return false;
    }

    hasMoves(): boolean {
        for (const [rowIndex, row] of this.board.entries()) {
            for (const [columnIndex, piece] of row.entries()) {

                if (!piece) {
                    continue;
                }

                if (piece.colour === this.activeColour) {
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
