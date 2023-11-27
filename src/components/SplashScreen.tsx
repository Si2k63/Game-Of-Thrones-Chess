import BoardController from '@engine/Board';
import { defaultBoard } from '@engine/Helpers/board';

interface ISplashScreen {
    onBeginClick: () => void
}

const SplashScreen: React.FC<ISplashScreen> = (props: ISplashScreen) => {
    const { onBeginClick } = props;
    return <div id='splash'>
        <img src='images/logo.png' />
        <button  onClick={onBeginClick}>Begin</button>
    </div>
}

export default SplashScreen;