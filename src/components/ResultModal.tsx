import useApplicationContext from "@/hooks/useApplicationContext";

const ResultModal = () => {
  const [{ result: { checkmate, stalemate, winner } }] = useApplicationContext();

  const classes = ["fixed inset-0 items-center justify-center bg-black bg-opacity-20 z-50"]
  const visible = checkmate || stalemate;

  if (!visible) {
    classes.push("hidden")
  }

  return (
    <div className={classes.join(" ")}>
      <div className="bg-gray-900 rounded-sm max-w-md w-full p-6 space-y-4 absolute transform translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2">
        <h3 className="text-xl text-slate-200 font-semibold">{checkmate ? `${winner} Wins!` : `Stalemate!`}</h3>
        <div className="space-y-4">
          <p className="text-gray-400">
            Would you like to play again?
          </p>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-8 py-2 bg-teal-600 text-white rounded hover:bg-gray-200">
            No
          </button>
          <button
            className="px-8 py-2 bg-teal-600 text-white rounded hover:bg-gray-200">
            Yes
          </button>
        </div>
      </div>
    </div >
  )
}

export default ResultModal;
