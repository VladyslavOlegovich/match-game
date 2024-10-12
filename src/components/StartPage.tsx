import styles from "../styles/StartPage.module.css";

interface StartPageProps {
  n: number;
  setN: (value: number) => void;
  m: number;
  setM: (value: number) => void;
  playerGoesFirst: boolean;
  setPlayerGoesFirst: (value: boolean) => void;
  startGame: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({
  n,
  setN,
  m,
  setM,
  playerGoesFirst,
  setPlayerGoesFirst,
  startGame,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>🌌 Welcome to the Galactic Match War! 🌌</h3>
        <p>
          In a faraway galaxy, Androids have attacked Earth! You are the last
          hero who can save the planet. To win, you 🦸‍♀️ need to beat the Androids
          👾 in a smart game: you and your opponent take turns picking 1, 2, or
          3 matches from a pile of 25. The game ends when all the matches are
          gone. The winner is the one with an even number of matches. Can you
          outsmart the Androids and save Earth, or will they win?
        </p>
      </div>

      <div className={styles.settings}>
        <p>🌍 Customize your gameplay experience and prepare for battle!</p>
        <div className={styles.settingGroup}>
          <span>
            N: {n} ({2 * n + 1} matches)
          </span>
          <input
            value={n}
            min={1}
            max={24}
            type="range"
            onChange={(e) => setN(Number.parseInt(e.target.value))}
          />
        </div>
        <div className={styles.settingGroup}>
          <span> M:{m} (max matches per turn)</span>
          <input
            value={m}
            min={1}
            max={9}
            type="range"
            onChange={(e) => setM(Number.parseInt(e.target.value))}
          />
        </div>
        <div className={styles.checkboxGroup}>
          <span>Does the Player take the first move?</span>
          <input
            className=""
            checked={playerGoesFirst}
            type="checkbox"
            onChange={(e) => setPlayerGoesFirst(e.target.checked)}
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <span
          className={styles.button}
          onClick={startGame}
          title="Start the game"
        >
          🕹️
        </span>
      </div>
    </div>
  );
};
