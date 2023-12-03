import Piece from '@components/Piece';
import { TPiece } from '@engine/Engine.types';
import useApplicationContext from '@hooks/useApplicationContext';

const Taken = () => {
    const [{ taken }] = useApplicationContext();

    return (
        <div className="absolute top-3 left-3 right-3 bottom-3 w-1/12 opacity-80 columns-3 gap-1">
            {taken.map((piece: TPiece) => <Piece {...piece} underAttack={false} active={false} />)}
        </div>
    )
}

export default Taken;