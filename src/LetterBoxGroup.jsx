import { useState } from "react";
import { useGame } from "./GameContext";

export default function LetterBoxGroup({ rowNumber, children }) {
  const [activeRow, setActiveRow] = useState();

  const { state, dispatch, activeWordArray, guessesArray } = useGame();

  return <div className={"letterboxgroup-container"}>{children}</div>;
}
