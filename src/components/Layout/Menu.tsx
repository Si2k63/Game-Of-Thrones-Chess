import Button from '@/components/Layout/Button';
import { faMusic, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import useApplicationContext from '@hooks/useApplicationContext';

export const theme = new Audio('/audio/theme.mp3')
theme.volume = 0.2;

const Menu: React.FC = () => {
    const [state, setState] = useApplicationContext();
    const { playTheme, playSounds } = state;

    const onMusicClick = () => {
        if (playTheme) {
            theme.pause();
        } else {
            theme.play();
        }

        setState({ ...state, playTheme: !playTheme })
    }

    return (
        <div id="menu">
            <Button
                onClick={onMusicClick}
                icon={faMusic}
                active={playTheme}
            />
            <Button
                onClick={() => setState({ ...state, playSounds: !playSounds })}
                active={playSounds}
                icon={faVolumeLow}
            />
        </div>
    )
}

export default Menu;