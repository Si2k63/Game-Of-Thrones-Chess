import Rook from "@/engine/pieces/Rook";
import useApplicationContext from "@/hooks/useApplicationContext";
import { useChessEngine } from "@/hooks/useChessEngine";
import Piece from "./Piece";
import Knight from "@/engine/pieces/Knight";
import Bishop from "@/engine/pieces/Bishop";
import Queen from "@/engine/pieces/Queen";
import { TPiece } from "@/engine/Engine.types";

const PromotionModal = () => {
  const [state, setState] = useApplicationContext();
  const {
    result,
    result: { canPromote, current },
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
      ...state,
      result: {
        ...result,
        canPromote: false,
      },
    });
  };

  const pieces: TPiece[] = [
    new Rook(current, "Left"),
    new Knight(current, "Left"),
    new Bishop(current, "Left"),
    new Queen(current),
  ];

  return (
    <div className={classes.join(" ")}>
      <div className="bg-gray-900 rounded-sm max-w-md w-full p-6 space-y-4 absolute transform translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2">
        <h3 className="text-xl text-white font-semibold">
          Choose Your Warrior
        </h3>
        <div className="space-y-4">
          <p className="font-bold text-slate-400">
            The iron throne may soon be yours!
          </p>
          <div className="grid grid-cols-4 grid-rows-1 gap-4 p-0">
            {pieces.map((piece, key) => (
              <Piece
                {...piece}
                key={key}
                underAttack={false}
                active={false}
                onClick={() => onPieceSelect(piece)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
