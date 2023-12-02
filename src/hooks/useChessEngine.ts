import { defaultBoard } from '@/engine/Helpers/board';
import useApplicationContext from '@/hooks/useApplicationContext';
import BoardController from '@engine/Board';
import { TCoordinates } from '@engine/Engine.types';
import { useEffect } from 'react';

const board = new BoardController(defaultBoard);

export function useChessEngine() {
    const [state, setState] = useApplicationContext();
    const { pieces, activePiece, availableSpaces, playSounds } = state;

    useEffect(
        () => setState({ ...state, pieces: board.getBoard() }),
        []
    );

    const onPieceClick = (activePiece: TCoordinates) => {
        const availableSpaces = board.getAvailableSpaces(activePiece)
        setState({ ...state, availableSpaces, activePiece });
    }

    const onPieceMove = (coordinates: TCoordinates) => {
        board.move(activePiece as TCoordinates, coordinates);
        setState({ ...state, pieces: [...board.getBoard()], availableSpaces: [] });
        playSound(coordinates, playSounds);
    }

    return { pieces, activePiece, availableSpaces, onPieceClick, onPieceMove };
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