import { TPieceProps } from "../component.types";

const Piece: React.FC<TPieceProps> = (props: TPieceProps) => {

    const { name, colour, active, underAttack, onClick } = props;
    const skin = props.skin || 'Default';
    const segments = [`Pieces/${colour}/${name}.${skin}`];

    if (underAttack) {
        segments.push('Attack')
    }

    if (!underAttack && active) {
        segments.push('Active');
    }

    if (!underAttack && !active) {
        segments.push('Main');
    }

    segments.push('png');

    const src: string = segments.join('.');

    return <img
        onClick={onClick}
        src={src}
        alt={`${colour} ${name}`}
        className="inline-block cursor-pointer"
    />
}

export default Piece;
