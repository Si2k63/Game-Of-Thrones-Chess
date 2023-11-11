import Bishop from "../pieces/Bishop";
import King from "../pieces/King";
import Knight from "../pieces/Knight";
import Pawn from "../pieces/Pawn";
import Queen from "../pieces/Queen";
import Rook from "../pieces/Rook";

export const defaultBoard = [
  [new Rook('Black'), new Knight('Black'), new Bishop('Black'), new Queen('Black'), new King('Black'), new Bishop('Black'), new Knight('Black'), new Rook('Black')],
  [new Pawn('Black'), new Pawn('Black'), new Pawn('Black'), new Pawn('Black'), new Pawn('Black'), new Pawn('Black'), new Pawn('Black'), new Pawn('Black')],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [new Pawn('White'), new Pawn('White'), new Pawn('White'), new Pawn('White'), new Pawn('White'), new Pawn('White'), new Pawn('White'), new Pawn('White')],
  [new Rook('White'), new Knight('White'), new Bishop('White'), new Queen('White'), new King('White'), new Bishop('White'), new Knight('White'), new Rook('White')],
]