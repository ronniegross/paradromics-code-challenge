import "./App.css";
// import GameContext from "./GameContext";
import { useState } from "react";
import LetterBox from "./LetterBox";
import { GameProvider, MAX_GUESSES, WORD_LENGTH } from "./GameContext";

// const INITIAL_STATE = {
//   phase: "playing",
//   targetWord: "",
//   guesses: [],
//   guessCount: 0,
//   wordLength: WORD_LENGTH,
// };

function App() {
  let wordleArr = [];
  const wordArr = () => {
    // add LetterBox instance for row length of WORD_LENGTH
    // add LetterBox instance for column length of MAX_GUESSES
    let count = 1;
    while (count < MAX_GUESSES) {
      console.log(count);
      count++;
    }
  };

  wordArr();

  return (
    <>
      <h1>hello world</h1>
      <GameProvider></GameProvider>
    </>
  );
}

export default App;
