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
  return (
    <ApplicationContext.Provider value={[state, setState]}>
      {children}
    </ApplicationContext.Provider>
  );
};
export default ApplicationContextProvider;
