// export default function LetterBox({ letter }) {
//   return <div className="letterbox-container">{letter}</div>;
// }
import { useGame } from "./GameContext";
import { useState } from "react";

export default function LetterBox({ position }) {
  const { state, dispatch } = useGame();
  const [letter, setLetter] = useState("");
  const [isCorrectPosition, setIsCorrectPosition] = useState(false);
  const [isInWord, setisInWord] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const checkLetter = () => {
    let charArr = [...state.targetWord];
    let matchIndex = state.targetWord.indexOf(letter);
    if (matchIndex === -1) {
      console.log("letter not in target word");
      if (!isIncorrect) {
        setIsIncorrect(true);
      }
    } else {
      charArr.map((element) => {
        if (state.targetWord[position] === letter) {
          console.log("letter is in the right spot");
          if (!isCorrectPosition) {
            setIsCorrectPosition(true);
          }
        } else if (element === letter) {
          console.log("letter in word but in wrong spot");
          if (!isInWord) {
            setisInWord(true);
          }
        }
      });
    }
  };

  const handleChange = (e) => {
    if (letter == "") {
      setLetter(e.target.value);
    }
  };

  checkLetter();
  console.log("state.targetWord :: ", state.targetWord);
  console.log("isInWord :: ", isInWord);
  console.log("isCorrectPosition :: ", isCorrectPosition);

  return (
    <div>
      <input
        className={
          isIncorrect
            ? "letterbox-container-not-in-word"
            : isCorrectPosition
            ? "letterbox-container-true"
            : isInWord
            ? "letterbox-container-in-word"
            : "letterbox-container"
        }
        maxLength="1"
        value={letter}
        onChange={handleChange}
      />
    </div>
  );
}
