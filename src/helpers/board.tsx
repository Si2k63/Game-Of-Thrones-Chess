import { ReactElement } from "react";
import Piece from "../components/Piece/Piece";

export const startingBoard: (ReactElement|null)[][] = [
    [
        <Piece colour='Black' type="Rook" />,
        <Piece colour='Black' type='Knight' />,
        <Piece colour='Black' type='Bishop' />,
        <Piece colour='Black' type='Queen' />,
        <Piece colour='Black' type='King' />,
        <Piece colour='Black' type='Bishop' />,
        <Piece colour='Black' type='Knight' />,
        <Piece colour='Black' type='Rook' />
    ],
    [
        <Piece colour='Black' type="Pawn" />,
        <Piece colour='Black' type='Pawn' />,
        <Piece colour='Black' type='Pawn' />,
        <Piece colour='Black' type='Pawn' />,
        <Piece colour='Black' type='Pawn' />,
        <Piece colour='Black' type='Pawn' />,
        <Piece colour='Black' type='Pawn' />,
        <Piece colour='Black' type='Pawn' />
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        <Piece colour='White' type="Rook" />,
        <Piece colour='White' type='Knight' />,
        <Piece colour='White' type='Bishop' />,
        <Piece colour='White' type='Queen' />,
        <Piece colour='White' type='King' />,
        <Piece colour='White' type='Bishop' />,
        <Piece colour='White' type='Knight' />,
        <Piece colour='White' type='Rook' />
    ],
    [
        <Piece colour='White' type="Pawn" />,
        <Piece colour='White' type='Pawn' />,
        <Piece colour='White' type='Pawn' />,
        <Piece colour='White' type='Pawn' />,
        <Piece colour='White' type='Pawn' />,
        <Piece colour='White' type='Pawn' />,
        <Piece colour='White' type='Pawn' />,
        <Piece colour='White' type='Pawn' />
    ],
]

export const swapPieces = (pieces: (ReactElement|null)[][], coordinates: number[]) => {
    
  [
    pieces[coordinates[0]][coordinates[1]],
    pieces[coordinates[2]][coordinates[3]],
  ] = 
      
  [
    pieces[coordinates[2]][coordinates[3]],
    pieces[coordinates[0]][coordinates[1]],
  ]
  
  return [...pieces];
}