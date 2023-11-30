import { ApplicationContext, defaultApplicationState } from "@/hooks/useApplicationContext";
import { useState } from "react";
import { TApplicationState } from "../../App.types";
import { TParentComponent } from "../component.types";

const ApplicationContextProvider: React.FC<TParentComponent> = (props: TParentComponent) => {
    const { children } = props;
    const [state, setState] = useState<TApplicationState>(defaultApplicationState);
    return (
        <ApplicationContext.Provider
            value={[state, (value: React.SetStateAction<TApplicationState>) => setState({ ...state, ...value })]}
        >
            {children}
        </ApplicationContext.Provider>
    )
}
export default ApplicationContextProvider;