import BoardController from '@engine/Board';
import { TCoordinates } from '@engine/Engine.types';
import { defaultBoard } from '@engine/helpers/board';
import useApplicationContext from '@hooks/useApplicationContext';
import { useEffect } from 'react';

const board = new BoardController(defaultBoard);
let sound: HTMLAudioElement = new Audio('audio/Black.Pawn.Default.mp3');

export function useChessEngine() {
    const [state, setState] = useApplicationContext();
    const { pieces, activePiece, availableSquares, playSounds } = state;

    useEffect(
        () => setState({ ...state, pieces: board.getBoard() }),
        []
    );

    const onPieceClick = (activePiece: TCoordinates) => {
        const availableSquares = board.getAvailableSquares(activePiece)
        playSound(activePiece, playSounds);
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

    return { pieces, isActivePiece, isAvailableSquare, onPieceClick, onPieceMove };
}

function playSound(activePiece: TCoordinates, playSounds: boolean): void {
    const piece = board.getPiece(activePiece);

    if (!piece || !playSounds) {
        return
    }

    sound.pause()
    sound = new Audio(`audio/${piece.colour}.${piece.name}.${piece.skin}.mp3`);
    sound.volume = 0.3;
    sound.play();
}
