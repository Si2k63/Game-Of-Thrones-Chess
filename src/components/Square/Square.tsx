import { MouseEventHandler } from 'react';
import { TParentComponent } from '../component.types';

type TSquareProps = TParentComponent & {
    colour: string,
    available: boolean,
    onClick?: MouseEventHandler<HTMLDivElement>
}

const Square: React.FC<TSquareProps> = (props: TSquareProps) => {
    const { colour, children, onClick, available } = props;
    const classes = ['square', colour];

    if (children || available) {
        classes.push('cursor-pointer');
    }

    if (available) {
        classes.push('available');
    }


    return (
        <div className={classes.join(" ")} onClick={onClick}>
            <span className="square-child-container">{children}</span>
        </div>
    );
}

export default Square;