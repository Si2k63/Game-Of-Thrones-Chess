import Move from './Move';

export type TPieceName = 'Pawn' | 'Bishop' | 'Knight' | 'Rook' | 'Queen' | 'King';
export type TPieceColour = 'Black' | 'White';

export type TCoordinates = [number, number];
export type TSquare = TPiece | null;
export type TBoard = TSquare[][]
export type TSkin = string;

export type TPiece = {
    name: TPieceName,
    colour: TPieceColour
    skin?: TSkin
    movements: Move[]
    getMoves: () => Move[]
}

export type TMovementRule = {
    setBoard: (board: TBoard) => void
    setPiece: (piece: TCoordinates) => void
    isValid: (movement: TCoordinates) => boolean
}