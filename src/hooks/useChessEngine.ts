import BoardController from '@engine/Board';
import { TCoordinates } from '@engine/Engine.types';
import { defaultBoard } from '@engine/helpers/board';
import useApplicationContext from '@hooks/useApplicationContext';
import useSound from '@hooks/useSound';
import { useEffect, useState } from 'react';

const board = new BoardController(defaultBoard);

export function useChessEngine() {

    const { playActivationSound } = useSound();

    const defaultState = {
        pieces: [],
        activePiece: null,
        availableSquares: [],
        taken: [],
        pieces: board.getBoard()
    }
    const [state, setState] = useState<TBoardState>(defaultState);
    const { pieces, activePiece, availableSquares, playSounds } = state;

    const onPieceClick = (activePiece: TCoordinates) => {
        const availableSquares = board.getAvailableSquares(activePiece)
        playActivationSound(board.getPiece(activePiece));
        setState({ ...state, availableSquares, activePiece });
    }

    const onPieceMove = (coordinates: TCoordinates) => {
        board.move(activePiece as TCoordinates, coordinates);
        setState({ ...state, pieces: [...board.getBoard()], availableSquares: [], taken: [...board.getTaken()] });
    }

    const isAvailableSquare = (coordinates: TCoordinates): boolean => {
        const match = availableSquares.filter(space => space[0] === coordinates[0] && space[1] === coordinates[1]);
        return match.length > 0;
    }

    const isActivePiece = (coordinates: TCoordinates): boolean => {
        return activePiece !== null && activePiece[0] === coordinates[0] && activePiece[1] === coordinates[1];
    }

    return { ...state, isActivePiece, isAvailableSquare, onPieceClick, onPieceMove };
}
