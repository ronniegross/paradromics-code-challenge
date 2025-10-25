import { WORD_LENGTH, useGame } from "./GameContext";
import { useState, useEffect } from "react";

export default function LetterBox({ position, row }) {
  // Import global state from GameContext.
  const {
    // state,
    activeWordArray,
    setActiveWordArray,
    guessesArray,
    setGuessesArray,
    hasWon,
    targetWord,
  } = useGame();

  // Component state and state setters.
  const [letter, setLetter] = useState("");
  const [isCorrectPosition, setIsCorrectPosition] = useState(false);
  const [isInWord, setisInWord] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

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

  useEffect(() => {
    if (!hasWon && targetWord) {
      setLetter("");
      setIsCorrectPosition(false);
      setisInWord(false);
      setIsIncorrect(false);
    }
  }, [hasWon, targetWord]);

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

  const checkLetter = () => {
    let charArr = [...targetWord];
    let matchIndex = targetWord.indexOf(letter);
    if (matchIndex === -1) {
      if (!isIncorrect) {
        setIsIncorrect(true);
      }
    } else {
      charArr.map((element) => {
        if (targetWord[position] === letter) {
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
    setLetter(e.target.value.toUpperCase());
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
