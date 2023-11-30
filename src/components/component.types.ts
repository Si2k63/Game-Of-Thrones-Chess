import { TPieceColour, TPieceName, TSkin } from "@/engine/Engine.types";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

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
}