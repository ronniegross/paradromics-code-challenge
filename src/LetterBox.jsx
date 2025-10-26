// export default function LetterBox({ letter }) {
//   return <div className="letterbox-container">{letter}</div>;
// }
import { Game } from "./GameContext";
import { useState, useEffect } from "react";

export default function LetterBox({ position, row }) {
  const { state, dispatch } = Game.use();
  const [letter, setLetter] = useState("");
  const [isCorrectPosition, setIsCorrectPosition] = useState(false);
  const [isInWord, setisInWord] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [activeWordArray, setActiveWordArray] = useState([]);

  Game.setupKeyboardListener(dispatch);

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter" || event.key === "Tab") {
  //     if (!activeWordArray.includes("")) {
  //       setGuessesArray([...guessesArray, activeWordArray.join("")]);
  //       setActiveWordArray(Array(WORD_LENGTH).fill(""));
  //     }
  //   }
  // };

  useEffect(() => {
    if (letter) {
      checkLetter();
      dispatch({ type: "keyPressed", key: letter.toLowerCase() });
      let newArr = [...activeWordArray];
      newArr[position] = letter;
      setActiveWordArray(newArr);
    }
  }, [letter]);

  const checkLetter = () => {
    let charArr = [...state.targetWord];
    let matchIndex = state.targetWord.indexOf(letter);
    if (matchIndex === -1) {
      if (!isIncorrect) {
        setIsIncorrect(true);
      }
    } else {
      charArr.map((element) => {
        if (state.targetWord[position] === letter) {
          if (!isCorrectPosition) {
            setIsCorrectPosition(true);
          }
        } else if (element === letter) {
          if (!isInWord) {
            setisInWord(true);
          }
        }
      });
    }
  };

  const handleChange = (e) => {
    setLetter(e.target.value.toLowerCase());
  };

  return (
    // <h1>letterbox</h1>
    <div className="letterbox-container-wrapper">
      <input
        className={
          state.guesses[row - 1]
            ? isIncorrect
              ? "letterbox-container-not-in-word"
              : isCorrectPosition
              ? "letterbox-container-true"
              : isInWord
              ? "letterbox-container-in-word"
              : "letterbox-container"
            : "letterbox-container"
        }
        maxLength="1"
        value={letter}
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
        // disabled={
        //   hasWon
        //     ? true
        //     : row - 1 < guessesArray.length || row - 1 > guessesArray.length
        //     ? true
        //     : false
        // }
      />
    </div>
  );
}
