import { TCoordinates, TPiece, TSquare } from '../Engine.types';
import AbstractMovementRule from './AbstractMovementRule';

class IsNotMovingIntoCheck extends AbstractMovementRule {

    isValid(movement: TCoordinates) {
        const piece: TSquare = this.getSelectedPiece();
        const target: TCoordinates = [this.piece[0] + movement[0], this.piece[1] + movement[1]];
        let valid = true;

        this.board.forEach((row: TSquare[], rowIndex: number) => {
            row.forEach((enemy: TSquare, columnIndex: number) => {
                if (!enemy || piece?.colour === enemy.colour) {
                    return;
                }

                const moves = enemy
                    .getMoves(this.board, [rowIndex, columnIndex])
                    .map(move => {
                        return move;
                    })

                const result = moves.find(move => {
                    return move[0] == target[0] && move[1] == target[1]
                }) ?? [];

                console.log(enemy?.name, result, target, result.length)

                if (result.length > 0) {
                    valid = false;
                }

            })
        })



        return valid;
    }
}

export default IsNotMovingIntoCheck;
