import { TCoordinates, TSquare } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsPinned extends AbstractMovementRule {

    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();
        let valid = true;

        this.board.forEach((row: TSquare[], rowIndex: number) => {
            row.forEach((enemy: TSquare, columnIndex: number) => {
                if (!enemy || piece?.colour === enemy.colour) {
                    return;
                }

                const vectors = enemy
                    .getVectors(this.board, [rowIndex, columnIndex])
                    .map(vector => vector.map(square => [rowIndex + square[0], columnIndex + square[1]])
                        .filter(square => square[0] >= 0 && square[1] >= 0 && square[0] < this.board.length && square[1] < this.board[0].length))

                for (const moves of vectors) {
                    const currentIndex = moves.findIndex(move => {
                        return move[0] == this.piece[0] && move[1] == this.piece[1]
                    });

                    if (currentIndex == -1) { // I'm not on this vector!
                        continue;
                    }

                    const obstructionIndex = moves
                        .slice(0, currentIndex)
                        .map(mv => this.board[mv[0]][mv[1]])
                        .findIndex(square => square !== null);

                    if (obstructionIndex >= 0) { // Something's in the way!
                        continue;
                    }

                    if (currentIndex == moves.length - 1) {
                        continue;
                    }

                    const kingIndex = moves.slice(currentIndex)
                        .map(mv => {
                            return this.board[mv[0]][mv[1]]
                        })
                        .findIndex(square => {
                            return square?.name == 'King' && square?.colour == piece?.colour
                        })

                    moves.push([rowIndex, columnIndex]) // add enemy position

                    const targetIndex = moves
                        .findIndex(square => square[0] == this.piece[0] + movement[0] && square[1] == this.piece[1] + movement[1]);

                    if (kingIndex >= 0 && targetIndex < 0) { // We're pinned!
                        // @TODO: we're gonna continue processing after this, adjust so we can just return here.
                        valid = false;
                    }

                }
            })
        })



        return valid;
    }
}

export default IsPinned;
