import { TApplicationContext, TApplicationState } from "@/App.types";
import { createContext, useContext } from "react";

export const defaultApplicationState: TApplicationState = {
    hasBegun: false,
    playTheme: true,
    playSounds: true,
    result: {
        checkmate: false,
        stalemate: false,
        winner: null
    }
}

export const ApplicationContext = createContext<TApplicationContext | null>(null);

export default function useApplicationContext() {
    const context = useContext(ApplicationContext);

    if (!context) {
        throw new Error('useApplicationContext must be called within a child of ApplicationContextProvider');
    }

    return context;
}
