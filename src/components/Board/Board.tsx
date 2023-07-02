import { startingBoard, swapPieces } from "../../helpers/board";
import Square from "../Square";
import { ReactElement, useState } from 'react';

const Board: React.FC = () => {

    const [pieces, setPieces] = useState<(ReactElement | null)[][]>(startingBoard);

    const colors: Array<string> = ['white', 'black', 'white'];

    return (
       <div id="board">
            {pieces.map((row: Array<any>, rowIndex: number) => {
                return (<div className="row" key={`row_${rowIndex}`}>
                    {row.map((square: any, squareIndex: number) => <Square onClick={() => setPieces([...swapPieces(pieces, [0, 0, 0, 1])])} available={rowIndex === 2 && squareIndex === 2} active={rowIndex === 0 && squareIndex === 1} key={`square_${squareIndex}`} colour={colors[rowIndex % 2 + squareIndex % 2]}>{square}</Square>)}
                </div>)
            })} 
       </div> 
    );
}

export default Board;