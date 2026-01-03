import Vector from "./helpers/Vector";
import Move from "./Move";

export type TPieceName =
  | "Pawn"
  | "Bishop"
  | "Knight"
  | "Rook"
  | "Queen"
  | "King";

export type TPieceColour = "Black" | "White";

export type TAbstractBoard = {
  contains(targetCoordinates: TCoordinates): boolean;
  getBoard(): TBoard;
  addRule(rule: TMovementRule): TAbstractBoard;
  getPiece(coords: TCoordinates): TSquare;
  getAbsoluteCoordinates(
    coordinates: TCoordinates,
    vector: TCoordinates,
  ): TCoordinates;
  getPieces(): Generator<TBoardPiece>;
  getPossibleMoves(move: TMove): TCoordinates[];
  hasPieceMoved(coords: TCoordinates): boolean;
  getVectors(
    target: TCoordinates,
  ): Vector[];
  getIntersectingVector(
    target: TCoordinates,
    origin: TCoordinates,
  ): Vector | undefined;
};

export type TCoordinates = [number, number];
export type TSquare = TPiece | null;
export type TBoard = TSquare[][];
export type TSkin = string;

export type TPiece = {
  name: TPieceName;
  colour: TPieceColour;
  skin?: TSkin;
  movements: Move[];
  getMoves: () => Move[];
};

export type TMove = {
  movement: TCoordinates;
  maximumRecurrences: number;
  getMovement(): TCoordinates;
  getMaximumRecurrences(): number;
};

export type TMovementRule = {
  setPiece: (piece: TCoordinates) => void;
  isValid: (movement: TCoordinates) => boolean;
};

export type TBoardState = {
  pieces: TBoard;
  activePiece: TCoordinates | null;
  availableSquares: TCoordinates[];
  taken: TPiece[];
};

export type TMoveResult = {
  checkmate: boolean;
  stalemate: boolean;
  canPromote: boolean;
  previous: TPieceColour;
  current: TPieceColour;
};

export type TBoardPiece = {
  rowIndex: number;
  columnIndex: number;
  piece: TPiece;
};
