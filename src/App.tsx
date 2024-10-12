import { useState } from "react";
import { StartPage } from "./components/StartPage.tsx";
import { GamePage } from "./components/GamePage.tsx";

function App() {
  const [n, setN] = useState(12);
  const [m, setM] = useState(3);
  const [playerGoesFirst, setPlayerGoesFirst] = useState(true);

  const [currentPage, setCurrentPage] = useState("StartPage");

  const handleStartGame = () => setCurrentPage("GamePage");
  const handleLeaveGame = () => setCurrentPage("StartPage");
  return (
    <>
      {currentPage === "StartPage" && (
        <StartPage
          n={n}
          setN={setN}
          m={m}
          setM={setM}
          playerGoesFirst={playerGoesFirst}
          setPlayerGoesFirst={setPlayerGoesFirst}
          startGame={handleStartGame}
        />
      )}
      {currentPage === "GamePage" && (
        <GamePage
          n={n}
          m={m}
          playerGoesFirst={playerGoesFirst}
          onBack={handleLeaveGame}
        />
      )}
    </>
  );
}

export default App;
