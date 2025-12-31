import usePromotionModal from "@/hooks/usePromotionModal";
import Piece from "@components/game/Piece";

const PromotionModal = () => {

  const { onPieceSelect, className, pieces } = usePromotionModal();

  return (
    <div className={className}>
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
                active={true}
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
