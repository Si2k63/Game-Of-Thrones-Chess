import { TCoordinates } from "../Engine.types";
import AbstractMovementRule from "./AbstractMovementRule";

class IsNullOrEnemyRule extends AbstractMovementRule {
    isValid(movement: TCoordinates) {
        const piece = this.getSelectedPiece();
        const target = this.getTargetPiece(movement);
        return target === null ||
            (target?.colour !== piece?.colour && target?.name !== "King" &&
                piece?.name !== "King");
    }
}

export default IsNullOrEnemyRule;
