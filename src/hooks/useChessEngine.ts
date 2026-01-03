import Board from "@engine/Board";
import { TBoardState, TCoordinates, TPiece } from "@engine/Engine.types";
import { defaultBoard } from "@engine/constants/board";
import useSound from "@hooks/useSound";
import { useState } from "react";

const board = new Board(defaultBoard);

/**
* Hook to manage the chess engine and its state in react.
* 
* @returns An object containing:
*
* The current TBoardState state spread into the object.
* onPromote - A function to handle piece promotion.
* onReset - Handles resetting the board to its original state.
* isActivePiece - Confirms whether the given coordinates is the active piece.
* isAvailableSquare - Determines if the given coordinates are an available square.
* onPieceClick - Handles the onClick event of a chess piece for the active player.
* onPieceMove - Handles the movement of a selected piece to its new target square.
*/
export function useChessEngine() {
  const { playActivationSound } = useSound();

  const defaultState = {
    activePiece: null,
    availableSquares: [],
    taken: [],
    pieces: board.getBoard(),
  };

  const [state, setState] = useState<TBoardState>(defaultState);
  const { activePiece, availableSquares } = state;

  const onPieceClick = (activePiece: TCoordinates) => {
    const availableSquares = board.getAvailableSquares(activePiece);
    playActivationSound(board.getPiece(activePiece));
    setState({ ...state, availableSquares, activePiece });
  };

  const onReset = () => {
    board.reset(defaultBoard);
    setState({
      ...state,
      pieces: [...board.getBoard()],
      availableSquares: [],
      taken: [],
    });
  };

  const onPieceMove = (coordinates: TCoordinates) => {
    const result = board.move(activePiece as TCoordinates, coordinates);
    setState({
      ...state,
      pieces: [...board.getBoard()],
      availableSquares: [],
      taken: [...board.getTaken()],
    });

    return result;
  };

  const onPromote = (piece: TPiece) => {
    board.promote(piece);
    setState({ ...state, pieces: [...board.getBoard()] });
  };

  const isAvailableSquare = (coordinates: TCoordinates): boolean => {
    const match = availableSquares.filter(
      (space) => space[0] === coordinates[0] && space[1] === coordinates[1],
    );
    return match.length > 0;
  };

  const isActivePiece = (coordinates: TCoordinates): boolean => {
    return (
      activePiece !== null &&
      activePiece[0] === coordinates[0] &&
      activePiece[1] === coordinates[1]
    );
  };

  return {
    ...state,
    onPromote,
    onReset,
    isActivePiece,
    isAvailableSquare,
    onPieceClick,
    onPieceMove,
  };
}
