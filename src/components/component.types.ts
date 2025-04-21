import { TPieceColour, TPieceName, TSkin } from "@/engine/Engine.types";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler, ReactNode } from "react";

export type TParentComponent = {
    children?: React.ReactNode
}

export type TButton = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    children?: ReactNode
    icon?: IconDefinition
    active?: boolean
}

export type TPieceProps = {
    name: TPieceName,
    colour: TPieceColour
    active: Boolean
    underAttack: Boolean
    skin?: TSkin
    onClick: MouseEventHandler
}

export type TAvailableSquareMarkerProps = {
    colour: TPieceColour
}

export type TSquareProps = TParentComponent & {
    colour: TPieceColour,
    available: boolean,
    onClick?: MouseEventHandler<HTMLDivElement>
}
