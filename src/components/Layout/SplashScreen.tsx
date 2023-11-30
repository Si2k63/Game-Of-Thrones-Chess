import { theme } from "@/components/Layout/Menu";
import useApplicationContext from "@/hooks/useApplicationContext";
import Button from "./Button";

const SplashScreen: React.FC = () => {
    const [state, setState] = useApplicationContext();

    const onBeginClick = () => {
        setState({ hasBegun: true });
        theme.play();
    }

    return (
        <div id='splash'>
            <img src='images/logo.png' />
            <Button onClick={onBeginClick}>Begin</Button>
        </div>
    );
}

export default SplashScreen;