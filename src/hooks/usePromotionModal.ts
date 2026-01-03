import Rook from "@/engine/pieces/Rook";
import useApplicationContext from "@/hooks/useApplicationContext";
import useChessEngine from "@/hooks/useChessEngine";
import Knight from "@/engine/pieces/Knight";
import Bishop from "@/engine/pieces/Bishop";
import Queen from "@/engine/pieces/Queen";
import { TPiece } from "@/engine/Engine.types";

/**
* Hook to manage the promotion modal and its associated funcionality.
*
* @returns An object containing:
*
* Pieces - The available promotion pieces.
* onPieceSelect - Function for handling when the piece to promote is selected by a user.
* className - The tailwind classes to set on the promotion modal's main div.
*/
export default function usePromotionModal() {
  const [state, setState] = useApplicationContext();
  const {
    result,
    result: { canPromote, previous },
  } = state;

  const { onPromote } = useChessEngine();

  const classes = [
    "fixed inset-0 items-center justify-center bg-black bg-opacity-20 z-50",
  ];

  if (!canPromote) {
    classes.push("hidden");
  }

  const onPieceSelect = (piece: TPiece) => {
    onPromote(piece);
    setState({
      result: {
        ...result,
        canPromote: false,
      },
    });
  };

  const pieces: TPiece[] = [
    new Rook(previous, "Left"),
    new Knight(previous, "Left"),
    new Bishop(previous, "Left"),
    new Queen(previous),
  ];

  return {
    pieces,
    onPieceSelect,
    className: classes.join(" ")
  }
}
