import { MoveResult } from "@engine/Engine.types";

export type TApplicationState = {
  hasBegun: boolean;
  playTheme: boolean;
  playSounds: boolean;
  result: MoveResult;
};

export type TApplicationContext = [
  TApplicationState,
  (state: Partial<TApplicationState>) => void
];
