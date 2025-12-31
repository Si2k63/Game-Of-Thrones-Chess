import useResultModal from "@/hooks/useResultModal";

const ResultModal = () => {

  const { className, checkmate, previous, onClose } = useResultModal();

  return (
    <div className={className}>
      <div className="bg-gray-900 rounded-sm max-w-md w-full p-6 space-y-4 absolute transform translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2">
        <h3 className="text-xl text-white font-semibold">
          {checkmate ? `${previous} Wins - Checkmate!` : `Stalemate!`}
        </h3>
        <div className="space-y-4">
          <p className="font-bold text-slate-400">Thanks for playing!</p>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-teal-600 text-white rounded hover:bg-teal-500"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
