interface PieceInterface {
    type: 'Pawn' | 'Bishop' | 'Knight' | 'Rook' | 'Queen' | 'King',
    colour: 'Black' | 'White'
}

const Piece: React.FC<PieceInterface> = (props: PieceInterface) => {
    const { type, colour } = props;
    return <img src={`Pieces/${colour}/${type}.png`} alt={`${colour} ${type}`} />
}

export default Piece;