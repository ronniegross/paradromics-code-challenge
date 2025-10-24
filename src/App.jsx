import "./App.css";
import { useState, useEffect } from "react";
import { useGame } from "./GameContext";

import LetterBox from "./LetterBox";
import LetterBoxGroup from "./LetterBoxGroup";

export default function App() {
  // Example of using the game context
  const { state, dispatch, guessesArray, hasWon, setHasWon } = useGame();
  // const []

  useEffect(() => {
    if (
      guessesArray.length <= state.guesses.length &&
      guessesArray.includes(state.targetWord)
    ) {
      console.log("you won!");
      setHasWon(true);
    }
  }, [guessesArray]);

  console.log("state is :: ", state);

  // // Example of using game state
  // if (state.phase === "won") {
  //   // ...
  // }

  // // Example of dispatching an action
  // dispatch({ type: "keyPressed", key: "a" });

  const buttonClick = () => {
    if (state.wordLength == 5) {
      console.log("u won");
    }
  };

  const generateLetterBoxRow = (guessIndex) => {
    let index = 0;
    let rowLength = state.wordLength;
    let wordArr = [];
    // let letter = null;
    while (index < rowLength) {
      wordArr.push(
        <LetterBox key={index} position={index} row={guessIndex}></LetterBox>
      );
      index++;
      // wordArr.push(<LetterBox key={index}>{letter}</LetterBox>);
    }
    // const isLocked = () => {
    //   if (state.guessCount )
    // }
    return (
      <LetterBoxGroup
        key={guessIndex}
        rowNumber={guessIndex}
        className="letterbox-group-container"
        children={wordArr}
      />
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
