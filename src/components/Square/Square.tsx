interface SquareInterface {
    colour: string,
    active: boolean,
    available: boolean,
    children?: React.ReactNode 
}

const Square: React.FC<SquareInterface> = (props: SquareInterface) => {
    const { colour, children, active, available} = props;

    const classes = ['square', colour];

    if (active) {
        classes.push('active');
    }

    if (available) {
        classes.push('available');
    }

    return (
        <div className={classes.join(" ")}>
            <span className="square-child-container">{children}</span>
        </div>
    );
}

export default Square;