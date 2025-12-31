import "@/App.css";
import Board from "@components/game/Board";
import Menu from "@components/ui/Menu";
import SplashScreen from "@components/ui/SplashScreen";
import TakenPieces from "@components/game/TakenPieces";
import useApplicationContext from "@hooks/useApplicationContext";
import ResultModal from "@components/ui/ResultModal";
import PromotionModal from "@components/ui/PromotionModal";

function App() {
  const [{ hasBegun }] = useApplicationContext();
  return (
    <div id="app">
      {hasBegun ? (
        <>
          <ResultModal />
          <PromotionModal />
          <TakenPieces />
          <Menu />
          <Board />
        </>
      ) : (
        <SplashScreen />
      )}
    </div>
  );
}

export default App;
