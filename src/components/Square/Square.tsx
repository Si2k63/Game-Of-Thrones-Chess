import { TSquareProps } from '../component.types';

const Square: React.FC<TSquareProps> = (props: TSquareProps) => {
    const { colour, children, onClick, available } = props;
    const classes = ['square relative w-1/8 h-full inline-flex items-center justify-center align-top p-2', colour];


    if (children || available) {
        classes.push('cursor-pointer');
    }

    if (available) {
        classes.push('available');
    }

    return (
        <div className={classes.join(" ")} onClick={onClick}>{children}</div>
    );
}

export default Square;