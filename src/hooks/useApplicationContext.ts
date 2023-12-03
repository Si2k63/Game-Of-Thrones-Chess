import { TApplicationContext, TApplicationState } from "@/App.types";
import { createContext, useContext } from "react";

export const defaultApplicationState: TApplicationState = {
    pieces: [],
    activePiece: null,
    availableSquares: [],
    hasBegun: false,
    playTheme: true,
    playSounds: true,
    taken: []
}

export const ApplicationContext = createContext<TApplicationContext | null>(null);

export default function useApplicationContext() {
    const context = useContext(ApplicationContext);

    if (!context) {
        throw new Error('useApplicationContext must be called within a child of ApplicationContextProvider');
    }

    return context;
}