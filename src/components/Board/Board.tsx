import { TCoordinates, TPieceColour } from '@/engine/Engine.types';
import { useChessEngine } from '@/hooks/useChessEngine';
import AvailableSquareMarker from '../AvailableSquareMarker';
import Piece from '../Piece/Piece';
import Square from '../Square';
import { TPieceProps } from '../component.types';

const Board: React.FC = () => {

    const { pieces, isActivePiece, isAvailableSquare, onPieceClick, onPieceMove } = useChessEngine();
    const colours: TPieceColour[] = ['White', 'Black', 'White'];

    return (
        <div id="board" className="absolute h-screen select-none shadow-2xl aspect-square left-1/2 transform -translate-x-1/2">
            {pieces && pieces.map((row: Array<any>, rowIndex: number) => {
                return (<div className="h-1/8" key={`row_${rowIndex}`}>
                    {row.map((piece: TPieceProps | null, columnIndex: number) => {
                        const coordinates: TCoordinates = [rowIndex, columnIndex];
                        const available: boolean = isAvailableSquare(coordinates);
                        const active: boolean = isActivePiece(coordinates);
                        const colour: TPieceColour = colours[rowIndex % 2 + columnIndex % 2];
                        return (
                            <Square
                                onClick={() => available ? onPieceMove(coordinates) : onPieceClick(coordinates)}
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