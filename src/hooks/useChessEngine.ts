import { defaultBoard } from '@/engine/Helpers/board';
import useApplicationContext from '@/hooks/useApplicationContext';
import BoardController from '@engine/Board';
import { TCoordinates } from '@engine/Engine.types';
import { useEffect } from 'react';

const board = new BoardController(defaultBoard);

export function useChessEngine() {
    const [state, setState] = useApplicationContext();
    const { pieces, activePiece, availableSquares, playSounds } = state;

    useEffect(
        () => setState({ ...state, pieces: board.getBoard() }),
        []
    );

    const onPieceClick = (activePiece: TCoordinates) => {
        const availableSquares = board.getAvailableSquares(activePiece)
        setState({ ...state, availableSquares, activePiece });
    }

    const onPieceMove = (coordinates: TCoordinates) => {
        board.move(activePiece as TCoordinates, coordinates);
        setState({ ...state, pieces: [...board.getBoard()], availableSquares: [] });
        playSound(coordinates, playSounds);
    }

    const isAvailableSquare = (coordinates: TCoordinates): boolean => {
        const match = availableSquares.filter(space => space[0] === coordinates[0] && space[1] === coordinates[1]);
        return match.length > 0;
    }

    const isActivePiece = (coordinates: TCoordinates): boolean => {
        return activePiece !== null && activePiece[0] === coordinates[0] && activePiece[1] === coordinates[1];
    }

    return { pieces, isActivePiece, isAvailableSquare, onPieceClick, onPieceMove };
}

function playSound(activePiece: TCoordinates, playSounds: boolean): void {
    const piece = board.getPiece(activePiece);

    if (!piece || !playSounds) {
        return
    }

    const sound = new Audio(`/audio/${piece.colour}.${piece.name}.${piece.skin}.mp3`);
    sound.volume = 0.3;
    sound.play();
}