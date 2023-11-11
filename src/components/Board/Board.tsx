import { TBoard, TSquare } from "../../engine/Engine.types";
import Piece, { PieceInterface } from "../Piece/Piece";
import Square from "../Square";

interface BoardInterface {
    pieces: TBoard
    availableSpaces: Number[][]
    onPieceClick: Function
}

const Board: React.FC<BoardInterface> = (props: BoardInterface) => {

    const { pieces, onPieceClick, availableSpaces } = props;
    const colors: Array<string> = ['white', 'black', 'white'];
 
    return (
       <div id="board">
            {pieces.map((row: Array<any>, rowIndex: number) => {
                return (<div className="row" key={`row_${rowIndex}`}>
                    {row.map((piece: PieceInterface | null, columnIndex: number) => {
                        
                        const available = availableSpaces.map(x => x.toString()).includes([rowIndex, columnIndex].toString())

                        return (
                            <Square onClick={() => onPieceClick([rowIndex, columnIndex])} available={available} active={false} key={`square_${columnIndex}`} colour={colors[rowIndex % 2 + columnIndex % 2]}>
                                {piece ? <Piece {...piece} /> : null}
                            </Square>
                        )
                    })}
                </div>)
            })} 
       </div> 
    );
}

export default Board;