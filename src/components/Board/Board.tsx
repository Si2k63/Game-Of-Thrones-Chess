import { useChessEngine } from '@/hooks/useChessEngine';
import Piece from '../Piece/Piece';
import Square from '../Square';
import { TPieceProps } from '../component.types';

const Board: React.FC = () => {

    const { pieces, activePiece, availableSpaces, onPieceClick, onPieceMove } = useChessEngine();
    const colours: Array<string> = ['white', 'black', 'white'];

    return (
        <div id="board">
            {pieces && pieces.map((row: Array<any>, rowIndex: number) => {
                return (<div className="row" key={`row_${rowIndex}`}>
                    {row.map((piece: TPieceProps | null, columnIndex: number) => {
                        const available: boolean = availableSpaces ? availableSpaces.map(x => x.toString()).includes([rowIndex, columnIndex].toString()) : false;
                        const active: boolean = activePiece ? activePiece[0] == rowIndex && activePiece[1] == columnIndex : false
                        return (
                            <Square
                                onClick={() => available ? onPieceMove([rowIndex, columnIndex]) : onPieceClick([rowIndex, columnIndex])}
                                available={available}
                                key={`square_${columnIndex}`}
                                colour={colours[rowIndex % 2 + columnIndex % 2]}
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