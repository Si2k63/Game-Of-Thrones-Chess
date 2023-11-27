import { TBoard, TCoordinates, TSquare } from '@engine/Engine.types';
import Piece, { PieceInterface } from '../Piece';
import Square from '../Square';

interface BoardInterface {
    pieces: TBoard
    availableSpaces: Number[][]
    activePiece: TCoordinates|null
    onPieceClick: Function
    onAvailableClick: Function
}

const Board: React.FC<BoardInterface> = (props: BoardInterface) => {
    const { pieces, onPieceClick, onAvailableClick, availableSpaces, activePiece } = props;
    const colors: Array<string> = ['white', 'black', 'white'];
    return (
        <div id="board">
            {pieces.map((row: Array<any>, rowIndex: number) => {
                return (<div className="row" key={`row_${rowIndex}`}>
                    {row.map((piece: PieceInterface | null, columnIndex: number) => {
                        const available = availableSpaces.map(x => x.toString()).includes([rowIndex, columnIndex].toString())
                        const active: boolean = activePiece ? activePiece[0] == rowIndex && activePiece[1] == columnIndex : false
                        return (
                            <Square
                                onClick={() => available ? onAvailableClick([rowIndex, columnIndex]) : onPieceClick([rowIndex, columnIndex])}
                                available={available}
                                key={`square_${columnIndex}`}
                                colour={colors[rowIndex % 2 + columnIndex % 2]}
                            >
                                {piece ? <Piece {...piece} underAttack={available} active={active} /> : null}
                            </Square>
                        )
                    })}
                </div>)
            })}
        </div>
    );
}

export default Board;