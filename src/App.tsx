import { ReactElement } from 'react'
import './App.css'
import Board from './components/Board'
import Piece from './components/Piece/Piece'

const pieces: (ReactElement|null)[][] = [
  [<Piece colour='Black' type="Rook" />, <Piece colour='Black' type='Knight' />, <Piece colour='Black' type='Bishop' />, <Piece colour='Black' type='Queen' />, <Piece colour='Black' type='King' />, <Piece colour='Black' type='Bishop' />, <Piece colour='Black' type='Knight' />, <Piece colour='Black' type='Rook' />],
  [<Piece colour='Black' type="Pawn" />, <Piece colour='Black' type='Pawn' />, <Piece colour='Black' type='Pawn' />, <Piece colour='Black' type='Pawn' />, <Piece colour='Black' type='Pawn' />, <Piece colour='Black' type='Pawn' />, <Piece colour='Black' type='Pawn' />, <Piece colour='Black' type='Pawn' />],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [<Piece colour='White' type="Pawn" />, <Piece colour='White' type='Pawn' />, <Piece colour='White' type='Pawn' />, <Piece colour='White' type='Pawn' />, <Piece colour='White' type='Pawn' />, <Piece colour='White' type='Pawn' />, <Piece colour='White' type='Pawn' />, <Piece colour='White' type='Pawn' />],
  [<Piece colour='White' type="Rook" />, <Piece colour='White' type='Knight' />, <Piece colour='White' type='Bishop' />, <Piece colour='White' type='Queen' />, <Piece colour='White' type='King' />, <Piece colour='White' type='Bishop' />, <Piece colour='White' type='Knight' />, <Piece colour='White' type='Rook' />],
]

function App() {

  return (
    <div className="App">
      <Board pieces={pieces} />
    </div>
  )
}

export default App
