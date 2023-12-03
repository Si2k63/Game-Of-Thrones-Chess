import { TBoard, TCoordinates, TPiece } from "@engine/Engine.types"

export type TApplicationState = {
    pieces: TBoard,
    activePiece: TCoordinates | null,
    availableSquares: TCoordinates[],
    hasBegun: boolean
    playTheme: boolean
    playSounds: boolean
    taken: TPiece[]
}

export type TApplicationContext = [TApplicationState, React.Dispatch<React.SetStateAction<TApplicationState>>];