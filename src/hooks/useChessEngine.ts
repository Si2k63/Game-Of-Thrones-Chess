import Board from "@engine/Board";
import { TBoardState, TCoordinates, TPiece } from "@engine/Engine.types";
import { defaultBoard } from "@engine/constants/board";
import useSound from "@hooks/useSound";
import { useState } from "react";

const board = new Board(defaultBoard);

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

  const setBoardState = (newState: Partial<TBoardState>) => setState((prevState: TBoardState) => ({ ...prevState, ...newState }))

  const onPieceClick = (activePiece: TCoordinates) => {
    const availableSquares = board.getAvailableSquares(activePiece);
    playActivationSound(board.getPiece(activePiece));
    setBoardState({ availableSquares, activePiece });
  };

  const onReset = () => {
    board.reset(defaultBoard);
    setBoardState({
      pieces: [...board.getBoard()],
      availableSquares: [],
      taken: [],
    });
  };

  const onPieceMove = (coordinates: TCoordinates) => {
    const result = board.move(activePiece as TCoordinates, coordinates);
    setBoardState({
      pieces: [...board.getBoard()],
      availableSquares: [],
      taken: [...board.getTaken()],
    });

    return result;
  };

  const onPromote = (piece: TPiece) => {
    board.promote(piece);
    setBoardState({ pieces: [...board.getBoard()] });
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
