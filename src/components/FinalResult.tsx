import styles from "../styles/FinalResult.module.css";

interface FinalResultProps {
  showFinalResult?: boolean;
  onClose: () => void;
  result: "win" | "lose" | "neutral";
  onRestart: () => void;
  onBack: () => void;
}

export const FinalResult: React.FC<FinalResultProps> = ({
  onClose,
  result,
  onRestart,
  onBack,
}) => {
  return (
    <>
      <div className={styles.finalResultContainer}>
        <p className={styles.resultMessage}>
          {result === "win" ? "Congratulations." : "Game Over"}
        </p>

        <div className={styles.resultDescription}>
          {result === "win" ? (
            <p>Victory! You've defeated the invaders and saved the Earth!</p>
          ) : (
            <p>
              The invaders 👾 claimed victory this time, but you 🦸‍♀️ can still
              fight back! Try again and save the Earth.
            </p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonRestart}`}
            onClick={() => {
              onRestart();
              onClose();
            }}
          >
            Restart
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonBack}`}
            onClick={onBack}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};
