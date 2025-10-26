import "./App.css";
import { useState, useEffect } from "react";
import { Game, GamePhase } from "./GameContext";

import LetterBox from "./LetterBox";

export default function App() {
  // Example of using the game context
  const { state, dispatch } = Game.use();
  // const []
  console.log("state is ", state);
  console.log("dispatch is ", dispatch);

  // console.log("activeWordArray, ", activeWordArray);
  // console.log("guessesArray, ", guessesArray);
  // useEffect(() => {
  //   if (
  //     state.guesses.length <= state.guesses.length &&
  //     state.guesses.includes(state.targetWord)
  //   ) {
  //     setHasWon(true);
  //   }
  // }, [guessesArray]);

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
      <div
        key={guessIndex}
        // rowNumber={guessIndex}
        className="letterboxgroup-container"
      >
        {wordArr}
      </div>

      // children={wordArr}
      // />
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
      {/* {hasWon && <h2>You won!!!</h2>}
      {!hasWon && guessesArray.length == state.guesses.length && (
        <h2>"You lost :("</h2>
      )}
       */}
      {generateWordRows()}
    </div>
  );
}
