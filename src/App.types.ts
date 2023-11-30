import { TBoard, TCoordinates } from "@engine/Engine.types"

export type TApplicationState = {
    pieces?: TBoard,
    activePiece?: TCoordinates | null,
    availableSpaces?: TCoordinates[],
    hasBegun?: boolean
    playTheme?: boolean
    playSounds?: boolean
}

export type TApplicationContext = [TApplicationState, React.Dispatch<React.SetStateAction<TApplicationState>>];