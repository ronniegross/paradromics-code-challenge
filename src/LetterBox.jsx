// export default function LetterBox({ letter }) {
//   return <div className="letterbox-container">{letter}</div>;
// }
import { useGame } from "./GameContext";
import { useState, useEffect } from "react";

export default function LetterBox({ position, row }) {
  const {
    state,
    dispatch,
    activeWordArray,
    setActiveWordArray,
    guessesArray,
    setGuessesArray,
    hasWon,
  } = useGame();
  const [letter, setLetter] = useState("");
  const [isCorrectPosition, setIsCorrectPosition] = useState(false);
  const [isInWord, setisInWord] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      if (!activeWordArray.includes("")) {
        setGuessesArray([...guessesArray, activeWordArray.join("")]);
        setActiveWordArray(["", "", "", "", ""]);
      }
    }
  };

  useEffect(() => {
    if (letter) {
      checkLetter();
      let newArr = [...activeWordArray];
      newArr[position] = letter;
      setActiveWordArray(newArr);
      // setActiveWordArray([...activeWordArray, letter]);
      // put letter in array in the index of position
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
    <div className="letterbox-container-wrapper">
      <input
        className={
          guessesArray[row - 1]
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
        onKeyDown={handleKeyDown}
        disabled={
          hasWon
            ? true
            : row - 1 < guessesArray.length || row - 1 > guessesArray.length
            ? true
            : false
        }
      />
    </div>
  );
}
