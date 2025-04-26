import Button from "@/components/Layout/Button";
import { faMusic, faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import useApplicationContext from "@hooks/useApplicationContext";
import useSound from "@hooks/useSound";

const Menu: React.FC = () => {
  const [{ playTheme, playSounds }] = useApplicationContext();
  const { toggleMusic, toggleSounds } = useSound();

  return (
    <div id="menu">
      <Button
        onClick={toggleMusic}
        icon={faMusic}
        active={playTheme}
      />
      <Button
        onClick={toggleSounds}
        active={playSounds}
        icon={faVolumeLow}
      />
    </div>
  );
};

export default Menu;
