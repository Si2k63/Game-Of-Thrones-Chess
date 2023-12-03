import '@/App.css';
import Board from './components/Board';
import Menu from './components/Layout/Menu';
import SplashScreen from './components/Layout/SplashScreen';
import TakenPieces from './components/TakenPieces';
import useApplicationContext from './hooks/useApplicationContext';

function App() {
    const [{ hasBegun }] = useApplicationContext();
    return (
        <div id="app">
            {hasBegun ?
                <>
                    <TakenPieces />
                    <Menu />
                    <Board />
                </>
                :
                <SplashScreen />
            }
        </div>
    )
}

export default App
