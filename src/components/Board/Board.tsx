import { TCoordinates, TPieceColour } from '@/engine/Engine.types';
import { useChessEngine } from '@/hooks/useChessEngine';
import AvailableSquareMarker from '../AvailableSquareMarker';
import Piece from '../Piece/Piece';
import Square from '../Square';
import { TPieceProps } from '../component.types';
import useApplicationContext from '@/hooks/useApplicationContext';

const Board: React.FC = () => {
    const { pieces, isActivePiece, isAvailableSquare, onPieceClick, onPieceMove } = useChessEngine();
    const [state, setState] = useApplicationContext();
    const colours: TPieceColour[] = ['White', 'Black', 'White'];

    const onClick = (coordinates: TCoordinates, available: boolean) => {
        if (available) {
            const result = onPieceMove(coordinates)
            setState({ ...state, result })
        } else {
            onPieceClick(coordinates)
        }
    }

    return (
        <div id="board" className="absolute h-fit w-fit select-none shadow-2xl aspect-square m-auto landscape:left-0 landscape:right-0 top-0 bottom-0">
            {pieces && pieces.map((row: Array<any>, rowIndex: number) => {
                return (<div className="landscape:h-1/8vh portrait:h-1/8vw" key={`row_${rowIndex}`}>
                    {row.map((piece: TPieceProps | null, columnIndex: number) => {
                        const coordinates: TCoordinates = [rowIndex, columnIndex];
                        const available: boolean = isAvailableSquare(coordinates);
                        const active: boolean = isActivePiece(coordinates);
                        const colour: TPieceColour = colours[rowIndex % 2 + columnIndex % 2];
                        return (
                            <Square
                                onClick={() => onClick(coordinates, available)}
                                available={available}
                                key={`square_${columnIndex}`}
                                colour={colour}
                            >
                                {piece ?
                                    <Piece {...piece} underAttack={available} active={active} />
                                    :
                                    available ? <AvailableSquareMarker colour={colour} /> : null
                                }
                            </Square>
                        )
                    })}
                </div>)
            })}
        </div>
    );
}

export default Board;
