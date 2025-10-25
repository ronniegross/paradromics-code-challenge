import "./App.css";
import { useEffect } from "react";
import {
  useGame,
  MAX_GUESSES,
  WORD_LENGTH,
  pickTargetWord,
} from "./GameContext";

import LetterBox from "./LetterBox";

export default function App() {
  // Import global state from GameContext.
  const {
    state,
    dispatch,
    guessesArray,
    setGuessesArray,
    setActiveWordArray,
    hasWon,
    setHasWon,
    gamePhase,
    setPhase,
    targetWord,
    setTargetWord,
  } = useGame();

  // Update hasWon variable if the length of the guesses array is less than or equal
  // to the guess limit and the guesses aray includes the target word.
  // Only initiate this logic if guessesArray has changed.
  useEffect(() => {
    if (
      guessesArray.length <= MAX_GUESSES &&
      guessesArray.includes(targetWord)
    ) {
      setHasWon(true);
      // dispatch({ type: "start" });
      setPhase("win");
    } else if (guessesArray.length == MAX_GUESSES) {
      setPhase("lost");
    }
  }, [guessesArray]);

  // Generate row of letter box comoponents based on word length.
  const generateLetterBoxRow = (guessIndex) => {
    let index = 0;
    let rowLength = WORD_LENGTH;
    let wordArr = [];
    while (index < rowLength) {
      wordArr.push(
        <LetterBox key={index} position={index} row={guessIndex}></LetterBox>
      );
      index++;
    }
    return (
      <div key={guessIndex} className="letterboxgroup-container">
        {wordArr}
      </div>
    );
  };

  // Generate rows of letter box components based on amount of guesses.
  const generateWordRows = () => {
    let index = 0;
    let guesses = MAX_GUESSES;
    let guessArr = [];
    while (index < guesses) {
      index++;
      guessArr.push(generateLetterBoxRow(index));
    }
    return <div className="word-group-container">{guessArr}</div>;
  };

  const resetGame = () => {
    dispatch({ type: "start" });

    setActiveWordArray(Array(WORD_LENGTH).fill(""));
    setGuessesArray([]);
    setHasWon(false);
    setPhase("playing");
    setTargetWord(pickTargetWord().toUpperCase());
  };

  // Render the app UI
  return (
    <div>
      <h1>Braindle</h1>
      {generateWordRows()}
      {gamePhase !== "playing" && hasWon && <h2>You won! 👏</h2>}
      {gamePhase !== "playing" && !hasWon && (
        <h2>You lost 😔 the word was {targetWord.toUpperCase()}</h2>
      )}
      {gamePhase !== "playing" && (
        <button className="start-again-button" onClick={resetGame}>
          Start Again
        </button>
      )}
    </div>
  );
}
