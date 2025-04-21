import useApplicationContext from "@/hooks/useApplicationContext";
import Button from "./Button";

const SplashScreen: React.FC = () => {
    const [applicationState, setApplicationState] = useApplicationContext();

    const onBeginClick = () => setApplicationState({ ...applicationState, hasBegun: true });

    return (
        <div id='splash'>
            <img src='images/logo.png' />
            <Button onClick={onBeginClick}>Begin</Button>
        </div>
    );
}

export default SplashScreen;
