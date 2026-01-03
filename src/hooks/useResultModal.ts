
import useApplicationContext, {
  defaultApplicationState,
} from "@/hooks/useApplicationContext";
import useChessEngine from "@/hooks/useChessEngine";

/**
 * Hook to manage the result modal at the end of the game and its associated functionality.
 *
* @returns An object containing:
*
* className - The classes to apply to the result modal's main div.
* checkmate - A boolean determining whether the game ended in checkmate.
* previous - The previous player's colour (White or Black).
* onClose - A function to handle the onClose modal event.
*/
export default function useResultModal() {
  const [
    {
      result: { checkmate, stalemate, previous },
    },
    setState,
  ] = useApplicationContext();

  const { onReset } = useChessEngine();

  const classes = [
    "fixed inset-0 items-center justify-center bg-black bg-opacity-20 z-50",
  ];
  const visible = checkmate || stalemate;

  if (!visible) {
    classes.push("hidden");
  }

  const onClose = () => {
    onReset();
    setState(defaultApplicationState);
  };

  return {
    className: classes.join(" "),
    checkmate,
    previous,
    onClose
  }
};
