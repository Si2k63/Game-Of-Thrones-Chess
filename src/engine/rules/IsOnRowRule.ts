import { TMovementRule } from "../Engine.types";
import AbstractMovementRule from "./AbstractMovementRule";

class IsOnRowRule extends AbstractMovementRule {
  
    row: number|null = null;
    
    setRow = (row: number): TMovementRule => {
      this.row = row;
      return this;
    }

    isValid() {
      return this.piece[0] === this.row;
    }
}

export default IsOnRowRule;