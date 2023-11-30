import Button from '@/components/Layout/Button';
import { faMusic, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import useApplicationContext from '@hooks/useApplicationContext';

export const theme = new Audio('/audio/theme.mp3')
theme.volume = 0.5;

const Menu: React.FC = () => {

    const [{ playTheme, playSounds }, setState] = useApplicationContext();

    const onMusicClick = () => {
        if (playTheme) {
            theme.pause();
        } else {
            theme.play();
        }

        setState({ playTheme: !playTheme })
    }

    return (
        <div id="menu">
            <Button
                onClick={onMusicClick}
                icon={faMusic}
                active={playTheme}
            />
            <Button
                onClick={() => setState({ playSounds: !playSounds })}
                active={playSounds}
                icon={faVolumeLow}
            />
        </div>
    )
}

export default Menu;