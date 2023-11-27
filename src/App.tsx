import Board from '@components/Board';
import SplashScreen from '@components/SplashScreen';
import BoardController from '@engine/Board';
import { TBoard, TCoordinates } from '@engine/Engine.types';
import { defaultBoard } from '@engine/Helpers/board';
import { useState } from 'react';
import './App.css';

const board = new BoardController(defaultBoard);

interface IApplicationState {
    pieces: TBoard,
    activePiece: TCoordinates|null,
    availableSpaces: TCoordinates[],
    hasBegun: Boolean
}

function App() {
    const [state, setState] = useState<IApplicationState>({
        pieces: [...board.getBoard()],
        activePiece: null,
        availableSpaces: [],
        hasBegun:false
    });

    const { pieces, activePiece, availableSpaces, hasBegun } = state;
    const theme = new Audio('/audio/theme.mp3')

    const onPieceClick = (activePiece: TCoordinates) => {
        const availableSpaces = board.getAvailableSpaces(activePiece)
        setState({...state, availableSpaces, activePiece });
    }

    const onAvailableClick = (coordinates: TCoordinates) => {
        board.move(activePiece as TCoordinates, coordinates);
        setState({...state, pieces: [...board.getBoard()], availableSpaces: [] });
    }

    const onBeginClick = () => {
        setState({...state, hasBegun: true });
        theme.play();
    }

    return (
        <div className="App" id="app">
            {!hasBegun ?
                    <SplashScreen onBeginClick={onBeginClick} />
                :
                    <>
                        <Board
                            activePiece={activePiece}
                            availableSpaces={availableSpaces}
                            pieces={pieces}
                            onPieceClick={onPieceClick}
                            onAvailableClick={onAvailableClick}
                        />
                    </>
            }
        </div>
    )
}

export default App
