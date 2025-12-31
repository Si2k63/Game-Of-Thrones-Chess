
import useApplicationContext, {
  defaultApplicationState,
} from "@/hooks/useApplicationContext";
import { useChessEngine } from "@/hooks/useChessEngine";

const useResultModal = () => {

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
}

export default useResultModal;
