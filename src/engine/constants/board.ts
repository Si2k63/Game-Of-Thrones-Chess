import Bishop from "../pieces/Bishop";
import King from "../pieces/King";
import Knight from "../pieces/Knight";
import Pawn from "../pieces/Pawn";
import Queen from "../pieces/Queen";
import Rook from "../pieces/Rook";

export const defaultBoard = [
  [
    new Rook("Black", "Left"),
    new Knight("Black", "Left"),
    new Bishop("Black", "Left"),
    new Queen("Black"),
    new King("Black"),
    new Bishop("Black", "Right"),
    new Knight("Black", "Right"),
    new Rook("Black", "Right"),
  ],
  [
    new Pawn("Black"),
    new Pawn("Black"),
    new Pawn("Black"),
    new Pawn("Black"),
    new Pawn("Black"),
    new Pawn("Black"),
    new Pawn("Black"),
    new Pawn("Black"),
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    new Pawn("White"),
    new Pawn("White"),
    new Pawn("White"),
    new Pawn("White"),
    new Pawn("White"),
    new Pawn("White"),
    new Pawn("White"),
    new Pawn("White"),
  ],
  [
    new Rook("White", "Left"),
    new Knight("White", "Left"),
    new Bishop("White", "Left"),
    new Queen("White"),
    new King("White"),
    new Bishop("White", "Right"),
    new Knight("White", "Right"),
    new Rook("White", "Right"),
  ],
];
