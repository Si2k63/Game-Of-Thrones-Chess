import { defaultBoard } from '@/engine/Helpers/board';
import useApplicationContext from '@/hooks/useApplicationContext';
import BoardController from '@engine/Board';
import { TCoordinates } from '@engine/Engine.types';
import { useEffect } from 'react';
import Piece from '../Piece/Piece';
import Square from '../Square';
import { TPieceProps } from '../component.types';

const board = new BoardController(defaultBoard);

const Board: React.FC = () => {

    const [{ pieces, activePiece, availableSpaces, playSounds }, setState] = useApplicationContext();

    useEffect(
        () => setState({ pieces: board.getBoard() }),
        []
    );

    const onPieceClick = (activePiece: TCoordinates) => {
        const availableSpaces = board.getAvailableSpaces(activePiece)
        setState({ availableSpaces, activePiece });
    }

    const onAvailableClick = (coordinates: TCoordinates) => {
        board.move(activePiece as TCoordinates, coordinates);
        setState({ pieces: [...board.getBoard()], availableSpaces: [] });
        const piece = board.getPiece(coordinates);

        if (!piece || !playSounds) {
            return
        }

        const sound = new Audio(`/audio/${piece.colour}.${piece.name}.${piece.skin}.mp3`);
        sound.volume = 0.7;
        sound.play();
    }

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
                                onClick={() => available ? onAvailableClick([rowIndex, columnIndex]) : onPieceClick([rowIndex, columnIndex])}
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