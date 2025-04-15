import { TPiece } from '@/engine/Engine.types';
import useApplicationContext from '@hooks/useApplicationContext';
import { useEffect } from 'react';

let sound: HTMLAudioElement = new Audio('audio/Black.Pawn.Default.mp3');
const theme = new Audio('audio/theme.mp3')
theme.volume = 0.2;

export default function useSound() {

  const [applicationState, setApplicationState] = useApplicationContext();
  const { playSounds, playTheme } = applicationState;

  function playActivationSound(piece: TPiece): void {
    if (!piece || !playSounds) {
      return
    }

    sound.pause()
    sound = new Audio(`audio/${piece.colour}.${piece.name}.${piece.skin}.mp3`);
    sound.volume = 0.3;
    sound.play();
  }

  function toggleSounds() {
    setApplicationState({ ...applicationState, playSounds: !playSounds })
  }

  function toggleMusic() {
    if (playTheme) {
      theme.pause();
    } else {
      theme.play();
    }

    setApplicationState({ ...applicationState, playTheme: !playTheme })
  }

  useEffect(() => {
    theme.play()
  }, [])

  return { toggleSounds, toggleMusic, playActivationSound }
}
