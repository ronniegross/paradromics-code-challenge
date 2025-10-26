/**
 * Game engine code.
 * YOU SHOULD NOT NEED TO EDIT THIS FILE ;)
 */
import React, { createContext, useContext, useEffect, useReducer } from "react";

/********************************************************************
 * Possible phases of the game
 * @enum {string}
 *
 * @example
 * // Example usage in a component
 * function SomeComponent() {
 *  const { state, dispatch } = Game.use();
 *
 *  if (state.phase === GamePhase.WON) {
 *    // ...
 *  }
 * }
 */
export const GamePhase = {
  /** Game is ongoing */
  PLAYING: "playing",
  /** Player has guessed the word */
  WON: "won",
  /** Player has used all guessed without guessing the word */
  LOST: "lost",
};

/********************************************************************
 * Possible states of a letter in the UI.
 * See `Game.letterState()` for usage.
 * @enum {string}
 * @see Game.letterState
 */
export const LetterState = {
  /** letter is in a future guess */
  FUTURE: "future",
  /** letter is in the current, incomplete guess */
  CURRENT: "current",
  /** letter is in a completed guess, correct and in the correct position */
  CORRECT: "correct",
  /** letter is in a completed guess, in the word but in the wrong position */
  PRESENT: "present",
  /** letter is in a completed guess, not in the word */
  MISSING: "missing",
};

/********************************************************************
 * The actual current state of the game.
 * This is your primary source for driving the UI.
 * @typedef {Object} GameState
 * @property {GamePhase} phase - The current phase of the game.
 * @property {string} targetWord - The target word to guess.
 * @property {string[]} guesses - Array of guessed words. Will always have length `Game.MAX_GUESSES`.
 * @property {number} guessCount - How many guesses have been made. Also the index of the current guess.
 * @property {number} wordLength - The length of the target word. Convenience property for `Game.WORD_LENGTH`.
 *
 * @example
 * // Example state object where the player is working on their 3rd guess
 * {
 *   phase: 'playing',
 *   targetWord: 'brain',
 *   guesses: ['wrong', 'train', 'bra', '', '', ''],
 *   guessCount: 2,
 *   wordLength: 5
 * }
 *
 * @example
 * // Example state object where the player has lost
 * {
 *   phase: 'lost',
 *   targetWord: 'brain',
 *   guesses: ['wrong', 'train', 'brawn', 'bring', 'wring', 'wrist'],
 *   guessCount: 6,
 *   wordLength: 5
 * }
 *
 * @example
 * // Example usage in a component
 * function SomeComponent() {
 *   const { state, dispatch } = Game.use();
 *
 *   if (state.phase === GamePhase.WON) {
 *     // ...
 *   }
 *
 *   state.guesses.forEach((word, wordIndex) => {
 *     // ...
 *   });
 * }
 */

/********************************************************************
 * Message formats for updating the game state using the
 * dispatch function provided by `useGame()`.
 * You don't need to worry about these too much, just use the
 * `Game.reset()` and `Game.setupKeyboardListener()` methods.
 * @typedef { { type: 'start' } | { type: 'keyPressed', key: string } } GameAction
 */

/********************************************************************
 * Game engine. Use this class to manage game state and logic.
 * Note that all the methods are static and should be accessed directly on the class.
 *
 * @example
 * ```js
 * const { state, dispatch } = Game.use();
 * Game.setupKeyboardListener(dispatch);
 * ```
 */
export class Game {
  /********************************************************
   * CONSTANTS
   * These are internal constants used by the game engine.
   * You don't need to use these directly.
   ********************************************************/

  /**
   * @private
   * List of possible words to guess
   */
  static TARGET_WORDS = ["brain", "think", "train", "sheep", "human", "speak"];
  /**
   * @private
   * Maximum number of guesses allowed
   */
  static MAX_GUESSES = 6;
  /**
   * @private
   * Length of the target word
   */
  static WORD_LENGTH = 5;
  /**
   * @private
   * Clean initial state for a new game
   * @type {GameState}
   * */
  static INITIAL_STATE = {
    phase: GamePhase.PLAYING,
    targetWord: "",
    guesses: [],
    guessCount: 0,
    wordLength: Game.WORD_LENGTH,
  };

  /********************************************************
   * PUBLIC METHODS
   * Use these in your code!
   ********************************************************/

  /**
   * Helper for React components to access the game state. Once you have the state
   * and dispatch, you can use this class to help with game logic.
   * @returns {{ state: GameState, dispatch: import('react').Dispatch<GameAction> } | null}
   * @see https://react.dev/reference/react/useContext
   */
  static use() {
    return useContext(this.GameContext);
  }

  /**
   * Call this to start a new game when the phase is 'won' or 'lost'.
   * @param dispatch The game dispatch function provided by `useGame()`
   *
   * @example
   * const { state, dispatch } = Game.use();
   * Game.reset(dispatch);
   */
  static reset(dispatch) {
    dispatch({ type: "start" });
  }

  /**
   * Setup a component to listen for keyboard events and dispatch them to the game
   * Call this from a React component (typically `App`) to process user keyboard input.
   * This will cause the game state to automatically update based on user key presses.
   *
   * @example
   * function App() {
   *    const { state, dispatch } = Game.use();
   *    Game.setupKeyboardListener(dispatch);
   * }
   *
   * @param dispatch The game dispatch function provided by `useGame()`
   */
  static setupKeyboardListener(dispatch) {
    useEffect(() => {
      const handler = (event) => {
        dispatch({ type: "keyPressed", key: event.key });
      };
      document.addEventListener("keyup", handler);
      return () => document.removeEventListener("keyup", handler);
    });
  }

  /**
   * UI helper for determining the state of a letter in the UI
   * Use this in your components to determine how to render each letter box.
   *
   * @example
   * const { state } = Game.use();
   * // ...
   * const letterState = Game.letterState(state, wordIndex, letterIndex);
   * // ... Render letter based on letterState
   *
   * // Use LetterState enum to check state if needed
   * if (letterState === LetterState.CORRECT) {
   *  // ...
   * }
   *
   * @param {GameState} state Current game state
   * @param {number} wordIndex Index of the current word
   * @param {number} letterIndex Index of the current letter inside the word
   * @returns {LetterState} The state of the letter. (See LetterState documentation)
   */
  static letterState(state, wordIndex, letterIndex) {
    /** @type {number} */
    const guessCount = state.guessCount;
    // This word hasn't been guessed yet
    if (guessCount < wordIndex) return LetterState.FUTURE;
    // This is the current word being guessed. Display as 'current' if playing, else 'future'.
    if (guessCount === wordIndex) {
      return state.phase === GamePhase.PLAYING
        ? LetterState.CURRENT
        : LetterState.FUTURE;
    }

    /** @type {string} */
    const letter = state.guesses[wordIndex][letterIndex];
    // Letter is correct
    if (letter === state.targetWord[letterIndex]) return LetterState.CORRECT;
    // Letter is present but in wrong position
    if (state.targetWord.includes(letter)) return LetterState.PRESENT;
    // Letter is not in the word
    return LetterState.MISSING;
  }

  /********************************************************
   * PRIVATE METHODS
   * Internal goo, don't need to use these directly
   * but they help the game work.
   ********************************************************/

  /**
   * Just to prevent instantiation. This is a static class.
   */
  constructor() {
    throw new Error("Game is a static class and cannot be instantiated");
  }

  /**
   * @private
   * Updates the game state based on a use key press. This is called
   * by the event handler setup in `setupKeyboardListener`.
   *
   * @param {GameState} state Current state
   * @param {string} key Key that was pressed
   * @returns {GameState} The new game state
   */
  static #handleKeyPressed(state, key) {
    /** @type {string} */
    let word = state.guesses[state.guessCount] || "";

    // Ignore keys if we're not playing
    if (state.phase !== GamePhase.PLAYING) return state;

    switch (key) {
      case "Backspace":
        if (word.length > 0) {
          /** @type {string[]} */
          const guesses = Array.from(state.guesses);
          guesses[state.guessCount] = word.slice(0, -1);

          return {
            ...state,
            guesses,
          };
        }
        break;

      case "Enter":
        if (word.length === this.WORD_LENGTH) {
          /** @type {GamePhase} */
          let phase = state.phase;
          if (word === state.targetWord) {
            phase = GamePhase.WON;
          } else if (state.guessCount === this.MAX_GUESSES - 1) {
            phase = GamePhase.LOST;
          }
          return {
            ...state,
            phase,
            guessCount: state.guessCount + 1,
          };
        }
        break;

      default:
        if (word.length < this.WORD_LENGTH && key >= "a" && key <= "z") {
          /** @type {string[]} */
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
   * @private
   * Internal helper to create a new game state. This selects a new target word
   * and resets all other state.
   * @returns {GameState} New game state
   */
  static #newState() {
    return {
      ...this.INITIAL_STATE,
      targetWord:
        this.TARGET_WORDS[Math.floor(Math.random() * this.TARGET_WORDS.length)],
      guesses: new Array(this.MAX_GUESSES).fill(""),
    };
  }

  /**
   * @private
   * React reducer to handle game state updates
   *
   * @param {GameState} state Current state
   * @param {GameAction} action Action to take
   * @returns {GameState} New game state
   */
  static #reducer(state, action) {
    switch (action.type) {
      case "start":
        return Game.#newState();
      case "keyPressed":
        return Game.#handleKeyPressed(state, action.key);
      default:
        throw new Error("Unhandled action");
    }
  }

  /**
   * React provider component for the game context
   * @param {{children: React.ReactNode}} param0 child nodes
   * @returns {JSX.Element}
   */
  static Provider({ children }) {
    /** @type {[GameState, import('react').Dispatch<GameAction>]} */
    const [state, dispatch] = useReducer(Game.#reducer, Game.#newState());
    return (
      <Game.GameContext.Provider value={{ state, dispatch }}>
        {children}
      </Game.GameContext.Provider>
    );
  }

  /**
   * React context to provide game state and event dispatch
   * @type {React.Context<{ state: GameState, dispatch: import('react').Dispatch<GameAction> } | null>}
   */
  static GameContext = createContext(null);
}
