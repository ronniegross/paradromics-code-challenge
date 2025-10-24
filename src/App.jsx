import "./App.css";
import { useEffect } from "react";
import { useGame } from "./GameContext";

import LetterBox from "./LetterBox";

export default function App() {
  // Import global state from GameContext.
  const { state, guessesArray, hasWon, setHasWon } = useGame();
  console.log("state is ", state);

  // Update hasWon variable if the length of the guesses array is less than or equal
  // to the guess limit and the guesses aray includes the target word.
  // Only initiate this logic if guessesArray has changed.
  useEffect(() => {
    if (
      guessesArray.length <= state.guesses.length &&
      guessesArray.includes(state.targetWord)
    ) {
      setHasWon(true);
    }
  }, [guessesArray]);

  // Generate row of letter box comoponents based on word length.
  const generateLetterBoxRow = (guessIndex) => {
    let index = 0;
    let rowLength = state.wordLength;
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
    let guesses = state.guesses.length;
    let guessArr = [];
    while (index < guesses) {
      index++;
      guessArr.push(generateLetterBoxRow(index));
    }
    return <div className="word-group-container">{guessArr}</div>;
  };

  // Render the app UI
  return (
    <div>
      <h1>braindle</h1>
      {hasWon && <h2>You won!!!</h2>}
      {!hasWon && guessesArray.length == state.guesses.length && (
        <h2>"You lost :("</h2>
      )}
      {generateWordRows()}
    </div>
  );
}
