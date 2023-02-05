import './Square.css'

interface SquareInterface {
    colour: string,
    active: boolean,
    available: boolean,
    children?: React.ReactNode 
}

const Square: React.FC<SquareInterface> = (props: SquareInterface) => {
    const { colour, children, active, available} = props;
    return <div className={`square ${colour} ${active && "active"} ${available && "available"}`}>{children}</div>
}

export default Square;