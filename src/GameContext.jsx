import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

// const TARGET_WORDS = Object.freeze([
//   "brain",
//   "think",
//   "train",
//   "sheep",
//   "human",
//   "speak",
// ]);

const TARGET_WORDS = Object.freeze(["train"]);

/** @typedef {'playing'|'won'|'lost'} GamePhase */

/**
 * @typedef {Object} GameState
 * @property {GamePhase} phase
 * @property {string} targetWord
 * @property {string[]} guesses
 * @property {number} guessCount
 * @property {number} wordLength
 */

/**
 * @typedef { { type: 'start' } | { type: 'keyPressed', key: string } } GameAction
 */

export const MAX_GUESSES = 2;
export const WORD_LENGTH = 5;
/** @type {GameState} */
const INITIAL_STATE = {
  phase: "playing",
  targetWord: "",
  guesses: [],
  guessCount: 0,
  wordLength: WORD_LENGTH,
};

/**
 * @param {GameState} state
 * @param {string} key
 * @returns {GameState}
 */
function handleKeyPressed(state, key) {
  let word = state.guesses[state.guessCount];

  if (state.phase !== "playing") return state;

  switch (key) {
    case "Backspace":
      if (word.length > 0) {
        const guesses = Array.from(state.guesses);
        guesses[state.guessCount] = word.slice(0, -1);

        return {
          ...state,
          guesses,
        };
      }
      break;

    case "Enter":
      if (word.length === WORD_LENGTH) {
        /** @type {GamePhase} */
        let phase = state.phase;
        if (word === state.targetWord) {
          phase = "won";
        } else if (state.guessCount === MAX_GUESSES - 1) {
          phase = "lost";
        }
        return {
          ...state,
          phase,
          guessCount: state.guessCount + 1,
        };
      }
      break;

    default:
      if (word.length < WORD_LENGTH && key >= "a" && key <= "z") {
        const guesses = Array.from(state.guesses);
        guesses[state.guessCount] = word + key;
        return {
          ...state,
          guesses,
        };
      }
  }

  return state;
}

/**
 * @returns {GameState}
 */
function newState() {
  return {
    ...INITIAL_STATE,
    targetWord: TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)],
    guesses: new Array(MAX_GUESSES).fill(""),
  };
}

/**
 * @param {GameState} state
 * @param {GameAction} action
 * @returns {GameState}
 */
function gameReducer(state, action) {
  switch (action.type) {
    case "start":
      return newState();
    case "keyPressed":
      return handleKeyPressed(state, action.key);
    default:
      throw new Error("Unhandled action");
  }
}

export function pickTargetWord() {
  return TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
}

// pickTargetWord();

/** @type {React.Context<{ state: GameState, dispatch: React.Dispatch<GameAction> } | null>} */
const GameContext = createContext(null);

/**
 * @param {{children: React.ReactNode}} props
 */
export function GameProvider({ children }) {
  /** @type {[GameState, React.Dispatch<GameAction>]} */
  const [state, dispatch] = useReducer(gameReducer, newState());
  const [activeWordArray, setActiveWordArray] = useState(
    Array(WORD_LENGTH).fill("")
  );
  const [guessesArray, setGuessesArray] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [gamePhase, setPhase] = useState("playing");
  const [targetWord, setTargetWord] = useState(pickTargetWord().toUpperCase());

  useEffect(() => {
    if (gamePhase !== "playing") {
      // setHasWon(false);
      // setGuessesArray([]);
      // setActiveWordArray(Array(WORD_LENGTH).fill(""));
    }
  }, [gamePhase]);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        activeWordArray,
        setActiveWordArray,
        guessesArray,
        setGuessesArray,
        hasWon,
        setHasWon,
        gamePhase,
        setPhase,
        targetWord,
        setTargetWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
