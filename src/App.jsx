import "./App.css";
import { useGame } from "./GameContext";

import LetterBox from "./LetterBox";

export default function App() {
  // Example of using the game context
  const { state, dispatch } = useGame();

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

  const generateLetterBoxRow = () => {
    let index = 1;
    let rowLength = state.wordLength;
    let wordArr = [];
    while (index <= rowLength) {
      console.log("startingLetterBox :: ", index);
      index++;
      wordArr.push(<LetterBox key={index}></LetterBox>);
    }
    console.log("generateLetterBoxRow was called");
    return <div className="letterbox-group-container">{wordArr}</div>;
  };

  const generateWordRows = () => {
    let index = 1;
    let guesses = state.guesses.length;
    let wordsArr = [];
    while (index <= guesses) {
      console.log("index :: ", index);
      index++;
      wordsArr.push(generateLetterBoxRow());
    }
    console.log("generateWordRows was called");
    return <div className="word-group-container">{wordsArr}</div>;
  };

  // Render the app UI
  return (
    <div>
      <h1>hello world</h1>
      <button onClick={buttonClick}>click me</button>
      {generateWordRows()}
    </div>
  );
}
