import Piece from '@components/Piece';
import { TPiece } from '@engine/Engine.types';
import { useChessEngine } from '@hooks/useChessEngine';

const Taken = () => {
    const { taken } = useChessEngine();

    return (
        <div className="absolute top-3 right-3 bottom-3 left-3 gap-1 w-1/12 opacity-80 columns-3 portrait:hidden">
            {taken.map((piece: TPiece) => <Piece {...piece} underAttack={false} active={false} />)}
        </div>
    )
}

export default Taken;
