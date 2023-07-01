import Square from "../Square";
interface BoardInterface {
    pieces: Array<any>
}

const Board: React.FC<BoardInterface> = (props: BoardInterface) => {

    const colors: Array<string> = ['white', 'black', 'white'];
    const { pieces } = props;

    return (
       <div id="board">
            {pieces.map((row: Array<any>, rowIndex: number) => {
                return (<div className="row" key={`row_${rowIndex}`}>
                    {row.map((square: any, squareIndex: number) => <Square available={rowIndex === 2 && squareIndex === 2} active={rowIndex === 0 && squareIndex === 1} key={`square_${squareIndex}`} colour={colors[rowIndex % 2 + squareIndex % 2]}>{square}</Square>)}
                </div>)
            })} 
       </div> 
    );
}

export default Board;