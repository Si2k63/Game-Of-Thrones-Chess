import { TBoard, TCoordinates, TPiece } from "@engine/Engine.types"

export type TApplicationState = {
    hasBegun: boolean
    playTheme: boolean
    playSounds: boolean
}

export type TApplicationContext = [TApplicationState, React.Dispatch<React.SetStateAction<TApplicationState>>];
