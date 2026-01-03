import { TApplicationContext, TApplicationState } from "@/App.types";
import { createContext, useContext } from "react";

export const defaultApplicationState: TApplicationState = {
  hasBegun: false,
  playTheme: true,
  playSounds: true,
  result: {
    checkmate: false,
    stalemate: false,
    canPromote: false,
    previous: "White",
    current: "Black",
  },
};

export const ApplicationContext = createContext<TApplicationContext | null>(
  null,
);

/**
* A hook to handle the initialisation of the application context.
*
* @returns The application context
*
*/
export default function useApplicationContext() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplicationContext must be called within a child of ApplicationContextProvider",
    );
  }

  return context;
}
