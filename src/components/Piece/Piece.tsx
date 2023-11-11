import { PieceColour, PieceName } from "../../engine/Engine.types";

export interface PieceInterface {
    name: PieceName,
    colour: PieceColour
}

const Piece: React.FC<PieceInterface> = (props: PieceInterface) => {
    const { name, colour } = props;
    return <img src={`Pieces/${colour}/${name}.png`} alt={`${colour} ${name}`} />
}

export default Piece;