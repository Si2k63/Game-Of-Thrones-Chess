import { TMoveResult } from "@engine/Engine.types";

export type TApplicationState = {
  hasBegun: boolean;
  playTheme: boolean;
  playSounds: boolean;
  result: TMoveResult;
};

export type TApplicationContext = [
  TApplicationState,
  (state: Partial<TApplicationState>) => void
];
