import { ReactElement } from 'react'
import './App.css'
import Board from './components/Board'
import Piece from './components/Piece/Piece'

const pieces: (ReactElement|null)[][] = [
  [<Piece colour='Black' type="Knight" />, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
]

function App() {

  return (
    <div className="App">
      <Board pieces={pieces} />
    </div>
  )
}

export default App
