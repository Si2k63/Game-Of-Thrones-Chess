import { useState } from 'react';
import './App.css';
import Board from '@components/Board';
import BoardController from '@engine/Board';
import { TBoard, TCoordinates } from '@engine/Engine.types';

function App() {

  const [pieces, setPieces] = useState<TBoard>(BoardController.getBoard());
  const [AvailableSpaces, setAvailableSpaces] = useState<Number[][]>([]);

  return (
    <div className="App">
      <Board availableSpaces={AvailableSpaces} pieces={pieces} onPieceClick={(TCoordinates: TCoordinates) => setAvailableSpaces(BoardController.getAvailableSpaces(TCoordinates))} />
    </div>
  )
}

export default App
