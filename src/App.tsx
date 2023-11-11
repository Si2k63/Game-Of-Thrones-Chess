import { useState } from 'react';
import './App.css';
import Board from '@components/Board';
import BoardController from '@engine/Board';
import { TBoard, TCoordinates, TSquare } from '@engine/Engine.types';
import { defaultBoard } from '@engine/Helpers/board';

const board = new BoardController(defaultBoard);

function App() {
    const [pieces, setPieces] = useState<TBoard>([...board.getBoard()]);
    const [activePiece, setActivePiece] = useState<TCoordinates|null>(null)
    const [AvailableSpaces, setAvailableSpaces] = useState<Number[][]>([]);

    const onPieceClick = (coordinates: TCoordinates) => {
        setActivePiece(coordinates);
        setAvailableSpaces(board.getAvailableSpaces(coordinates));
    }

    const onAvailableClick = (coordinates: TCoordinates) => {
        board.move(activePiece as TCoordinates, coordinates);
        setPieces([...board.getBoard()]);
        setAvailableSpaces([]);
    }

    return (
      <div className="App">
          <Board
              availableSpaces={AvailableSpaces}
              pieces={pieces}
              onPieceClick={onPieceClick}
              onAvailableClick={onAvailableClick}
          />
      </div>
    )
}

export default App
