import { WORD_LENGTH, useGame } from "./GameContext";
import { useState, useEffect } from "react";

export default function LetterBox({ position, row }) {
  // Import global state from GameContext.
  const {
    state,
    activeWordArray,
    setActiveWordArray,
    guessesArray,
    setGuessesArray,
    hasWon,
  } = useGame();

  // Component state and state setters.
  const [letter, setLetter] = useState("");
  const [isCorrectPosition, setIsCorrectPosition] = useState(false);
  const [isInWord, setisInWord] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  // Handler for key down events.
  // Checks to see if enter or tab was selected, and initates state to update the guesses
  // array, and resets the active word array.
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      if (!activeWordArray.includes("")) {
        setGuessesArray([...guessesArray, activeWordArray.join("")]);
        setActiveWordArray(Array(WORD_LENGTH).fill(""));
      }
    }
  };

  // Checks to see if the state variable "letter" has changed, and if so, calls the checkLetter
  // function which determines whether or not the letter is in the target word, and if it is, whether
  // or not it is in the correct position.
  // It also updates the letter's position  and updates the active word array.
  useEffect(() => {
    if (letter) {
      checkLetter();
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

  // As letters are being typed into the input components, this function calls the state setter
  // and ensures that the letters are lowercase.
  const handleChange = (e) => {
    setLetter(e.target.value.toLowerCase());
  };

  return (
    <div className="letterbox-container-wrapper">
      <input
        className={
          guessesArray[row - 1]
            ? isIncorrect
              ? "letterbox-container not-in-word"
              : isCorrectPosition
              ? "letterbox-container true"
              : isInWord
              ? "letterbox-container in-word"
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
