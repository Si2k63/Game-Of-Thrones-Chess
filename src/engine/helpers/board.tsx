import Bishop from '../Pieces/Bishop';
import King from '../Pieces/King';
import Knight from '../Pieces/Knight';
import Pawn from '../Pieces/Pawn';
import Queen from '../Pieces/Queen';
import Rook from '../Pieces/Rook';

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