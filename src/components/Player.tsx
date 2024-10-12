import { useState, useMemo, useEffect } from "react";
import styles from "../styles/Player.module.css";
interface PlayerProps {
  isComputer?: boolean;
  matches: number;
  resetHistory: boolean;
  hasReset: boolean;
}

export const Player: React.FC<PlayerProps> = ({
  isComputer,
  matches,
  resetHistory,
  hasReset,
}) => {
  const [matchHistory, setMatchHistory] = useState<number[]>([]);
  const [currentHistory, setCurrentHistory] = useState(0);

  useEffect(() => {
    if (resetHistory) {
      setMatchHistory([]);
      setCurrentHistory(0);
    }
  }, [resetHistory]);

  useMemo(() => {
    if (!hasReset) {
      setMatchHistory((m) => [...m, matches]);
    }
  }, [matches, hasReset]);

  useEffect(() => {
    const length = matchHistory.length;
    if (length < 2) return;

    const history = matchHistory[length - 1] - matchHistory[length - 2];

    if (history <= 0) {
      setCurrentHistory(0);
      return;
    }
    setCurrentHistory(history);
  }, [matchHistory]);

  return (
    <div className={styles.playerContainer}>
      <div className={styles.playerInfo}>
        <span className={styles.playerIcon}>{isComputer ? "👾" : "🦸‍♀️"}</span>
      </div>
      <div className={styles.historyContainer}>
        <span className={styles.playerHistory}>
          Total: <span className={styles.totalMatches}>{matches}</span>
        </span>
        <span className={styles.historyDifference}>
          {currentHistory > 0 ? `Last Move: ${currentHistory}` : ""}
        </span>
      </div>
      <div className={styles.moveHistory}>
        <h4 className={styles.historyTitle}>Move History</h4>
        <select className={styles.historyList}>
          {matchHistory.slice(1).map((move, index) => {
            const previousMove = matchHistory[index];
            const difference = move - previousMove;
            return (
              <option key={index} className={styles.historyItem}>
                Step {index + 1}:{" "}
                {difference > 0 ? `${difference}` : difference}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
