import { useState, useEffect, useCallback } from "react";
import { canWin, clamp, makeMove } from "../utils/gameLogic.ts";
import { Player } from "./Player.tsx";
import { FinalResult } from "./FinalResult.tsx";
import styles from "../styles/GamePage.module.css";
interface GamePage {
  playerGoesFirst: boolean;
  n: number;
  m: number;
  onBack: () => void;
}

export const GamePage: React.FC<GamePage> = ({
  playerGoesFirst,
  n,
  m,
  onBack,
}) => {
  const startingMatches = 2 * n + 1;

  const [matches, setMatches] = useState(startingMatches);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(playerGoesFirst);
  const [playerWon, setPlayerWon] = useState<boolean | undefined>(undefined);
  const [showFinalResult, setShowFinalResult] = useState(false);

  const [resetHistory, setResetHistory] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  const clampedMatches = clamp(m, 1, matches);

  const takeMatches = useCallback(
    (amount: number, computer = false) => {
      const matchesLeft = matches - amount;

      if (matches === 0) return false;
      if (matchesLeft < 0) return false;

      setMatches(matchesLeft);

      if (computer) {
        setComputerMatches(computerMatches + amount);
      } else {
        setPlayerMatches(playerMatches + amount);
      }

      setIsPlayerTurn(!isPlayerTurn);
      return true;
    },
    [computerMatches, isPlayerTurn, matches, playerMatches]
  );

  const handleWin = useCallback(() => {
    setPlayerWon(playerMatches % 2 === 0);
    setShowFinalResult(true);
  }, [playerMatches]);

  useEffect(() => {
    if (matches === 0) return handleWin();
    if (isPlayerTurn) return;

    const winningMove = canWin(clampedMatches, matches, computerMatches);

    setTimeout(() => {
      if (matches === startingMatches && !playerGoesFirst) {
        takeMatches(winningMove || 2, true);
        return;
      }

      if (winningMove) {
        takeMatches(winningMove, true);
        return;
      }

      takeMatches(makeMove(matches, m), true);
    }, 1000);
  }, [
    matches,
    handleWin,
    isPlayerTurn,
    clampedMatches,
    computerMatches,
    startingMatches,
    playerGoesFirst,
    takeMatches,
    m,
  ]);

  const handleReset = () => {
    setMatches(startingMatches);
    setPlayerMatches(0);
    setComputerMatches(0);
    setIsPlayerTurn(playerGoesFirst);
    setShowFinalResult(false);
    setResetHistory(true);
    setHasReset(true);
    setTimeout(() => {
      setResetHistory(false);
      setHasReset(false);
    }, 0);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="">
            <h1 className={styles.matchCounter}>{matches}</h1>
            <span className=""></span>
          </div>
          <div className={styles.playerGroup}>
            <Player
              matches={playerMatches}
              resetHistory={resetHistory}
              hasReset={hasReset}
            />
            <span className={styles.versus}>🆚</span>
            <Player
              isComputer
              matches={computerMatches}
              resetHistory={resetHistory}
              hasReset={hasReset}
            />
          </div>
        </div>
        <div className={styles.playButtonGroup}>
          {Array(m)
            .fill("")
            .map((_value, index) => (
              <button
                className={styles.playButton}
                key={index}
                onClick={() => {
                  takeMatches(index + 1);
                }}
                disabled={!isPlayerTurn || index + 1 > matches}
              >
                {" "}
                {(index + 1).toString()}{" "}
              </button>
            ))}
          <button className={styles.resetButton} onClick={handleReset}>
            {" "}
            Reset{" "}
          </button>
        </div>
        {showFinalResult && (
          <FinalResult
            showFinalResult={showFinalResult}
            onClose={() => setShowFinalResult(false)}
            result={playerWon ? "win" : "lose"}
            onRestart={handleReset}
            onBack={onBack}
          />
        )}
      </div>
    </>
  );
};
