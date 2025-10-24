import "./App.css";
import { useState, useEffect } from "react";
import { useGame } from "./GameContext";

import LetterBox from "./LetterBox";

export default function App() {
  // Example of using the game context
  const { state, guessesArray, hasWon, setHasWon } = useGame();
  useEffect(() => {
    if (
      guessesArray.length <= state.guesses.length &&
      guessesArray.includes(state.targetWord)
    ) {
      setHasWon(true);
    }
  }, [guessesArray]);

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
