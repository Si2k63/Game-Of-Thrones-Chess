import { PieceColour, PieceName, TSkin } from '@engine/Engine.types';

export interface PieceInterface {
    name: PieceName,
    colour: PieceColour
    active: Boolean
    underAttack: Boolean
    skin?: TSkin
}

const Piece: React.FC<PieceInterface> = (props: PieceInterface) => {

    const { name, colour, active, underAttack } = props;
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
        src={src} 
        alt={`${colour} ${name}`} 
    />
}

export default Piece;