import "./App.css";
import { useState } from "react";
import { useGame } from "./GameContext";

import LetterBox from "./LetterBox";
import LetterBoxGroup from "./LetterBoxGroup";

export default function App() {
  // Example of using the game context
  const { state, dispatch } = useGame();
  // const []

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
      wordArr.push(<LetterBox key={index} position={index}></LetterBox>);
      index++;
      // wordArr.push(<LetterBox key={index}>{letter}</LetterBox>);
    }
    // const isLocked = () => {
    //   if (state.guessCount )
    // }
    return (
      <div key={guessIndex} className="letterbox-group-container">
        {wordArr}
      </div>
    );
  };

  const generateWordRows = () => {
    let index = 1;
    let guesses = state.guesses.length;
    let guessArr = [];
    while (index <= guesses) {
      index++;
      guessArr.push(generateLetterBoxRow(index));
    }
    return <div className="word-group-container">{guessArr}</div>;
  };

  // Render the app UI
  return (
    <div>
      <h1>hello world</h1>
      {/* <button onClick={buttonClick}>click me</button> */}
      {generateWordRows()}
    </div>
  );
}
