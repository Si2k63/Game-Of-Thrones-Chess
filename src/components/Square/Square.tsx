import { MouseEventHandler } from 'react';

interface SquareInterface {
    colour: string,
    active: boolean,
    available: boolean,
    children?: React.ReactNode ,
    onClick?: MouseEventHandler<HTMLDivElement>
}

const Square: React.FC<SquareInterface> = (props: SquareInterface) => {
    const { colour, children, onClick, active, available} = props;
    
    /**
     * @todo: Class variance authority package?
     * https://youtube.com/shorts/_eFPsxlFBrY?feature=share
     */

    const classes = ['square', colour];

    if (active) {
        classes.push('active');
    }
    
    if (children) {
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