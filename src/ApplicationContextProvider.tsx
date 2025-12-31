import {
  ApplicationContext,
  defaultApplicationState,
} from "@hooks/useApplicationContext";
import { useState } from "react";
import { TApplicationState } from "@/App.types";
import { TParentComponent } from "@components/component.types";

const ApplicationContextProvider: React.FC<TParentComponent> = (
  props: TParentComponent,
) => {
  const { children } = props;
  const [state, setState] = useState<TApplicationState>(
    defaultApplicationState,
  );

  const setApplicationState = (newState: Partial<TApplicationState>): void => setState((prevState: TApplicationState) => ({ ...prevState, ...newState }));

  return (
    <ApplicationContext.Provider value={[state, setApplicationState]}>
      {children}
    </ApplicationContext.Provider>
  );
};
export default ApplicationContextProvider;
