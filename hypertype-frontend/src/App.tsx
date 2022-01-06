import React from "react";
import { useState, useEffect, useRef } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { generate } from "./util/words";
import useKeyPress from "./hooks/useKeyPress";
import currentTime from "./util/time";
import Modal from "./components/Modal";
import downArrow from "./assets/arrow.svg";
import { blue, green } from "@material-ui/core/colors";
import Leaderboard from "./components/Leaderboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});

export default function App() {
  let initialWords = generate().toLowerCase();

  const timerTime = 30;

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(" ").join("")
  );

  // outoingChars = typed chars, currentChar = current char, incomingChars = chars to type
  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

  // States for WPM, CPM
  const [startTime, setStartTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);

  // States for accuracy
  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState("");
  const [typoChars, setTypoChars] = useState("");

  // States for timer
  const [started, setStarted] = useState(false);
  const [counter, setCounter] = useState(timerTime);

  // States for modal
  const [showModal, setShowModal] = useState(false);
  const [keyDisabled, setKeyDisabled] = useState(false);
  const [resetDisabled, setResetDisabled] = useState(false);

  // Ref for leaderboard
  const lbRef = useRef(null);

  // Keypress hook
  useKeyPress((key: any) => {
    if (keyDisabled === false) {
      if (!startTime) {
        setStartTime(currentTime());
      }

      handleStart();

      let updatedOutgoingChars = outgoingChars;
      let updatedIncomingChars = incomingChars;

      if (key === currentChar) {
        if (incomingChars.charAt(0) === " ") {
          setWordCount(wordCount + 1);
          const durationInMinutes = (currentTime() - startTime) / 60000.0;
          setCpm(
            parseFloat(
              (
                (typedChars.length - typoChars.length) /
                durationInMinutes
              ).toFixed(2)
            )
          );
          setWpm(parseFloat((cpm / 5).toFixed(2)));
        }

        if (leftPadding.length > 0) {
          setLeftPadding(leftPadding.substring(1));
        }

        updatedOutgoingChars += currentChar;
        setOutgoingChars(updatedOutgoingChars);

        setCurrentChar(incomingChars.charAt(0));

        updatedIncomingChars = incomingChars.substring(1);
        if (updatedIncomingChars.split(" ").length < 10) {
          updatedIncomingChars += " " + generate().toLowerCase();
        }
        setIncomingChars(updatedIncomingChars);
      } else {
        if (currentChar !== " ") {
          setTypoChars(typoChars + key);
        }
      }

      const updatedTypedChars = typedChars + key;
      setTypedChars(updatedTypedChars);
      setAccuracy(
        parseFloat(
          (
            (updatedOutgoingChars.length * 100) /
            updatedTypedChars.length
          ).toFixed(2)
        )
      );
    }
  });

  function handleReset() {
    initialWords = generate().toLowerCase();
    setStartTime(0);
    setTypedChars("");
    setWordCount(0);
    setWpm(0);
    setCpm(0);
    setAccuracy(0);
    setOutgoingChars("");
    setIncomingChars(initialWords.substr(1));
    setCurrentChar(initialWords.charAt(0));
    setTypoChars("");
    setCounter(timerTime);
    setStarted(false);
  }

  function handleStart() {
    setStarted(true);
  }

  function handleModalClose() {
    setShowModal(false);
    handleReset();
    setKeyDisabled(false);
    setResetDisabled(false);
  }

  // for timer
  useEffect(() => {
    document.title = "Hypertype";

    let timer: any;
    if (started !== false) {
      timer = setInterval(() => setCounter(counter - 1), 1000);
    }

    if (counter === 0) {
      setShowModal(true);

      // Disable timer, keyboard input, and reset button
      setStarted(false);
      setKeyDisabled(true);
      setResetDisabled(true);
    }

    return () => clearInterval(timer);
  }, [counter, started]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <div className="app-header">Hypertype</div>
        <div className="stats">
          <h3>wpm: {wpm} |</h3>
          <h3> cpm: {cpm} |</h3>
          <h3> acc: {accuracy}%</h3>
        </div>

        <header className="game">
          {counter}s
          <p className="character">
            <span className="character-out">
              {(leftPadding + outgoingChars).slice(-20)}
            </span>
            <span className="character-current">{currentChar}</span>
            <span>{incomingChars.substr(0, 20)}</span>
          </p>
          {showModal ? (
            <Modal
              wpm={wpm}
              cpm={cpm}
              acc={accuracy}
              closePopup={handleModalClose}
            />
          ) : null}
          <h3 className="typo">{typoChars}</h3>
          <div className="redo">
            <FontAwesomeIcon
              style={resetDisabled ? { display: "none" } : {}}
              onClick={handleReset}
              icon={faRedo}
            />
          </div>
          <img
            className="arrow"
            src={downArrow}
            alt="down arrow"
            width="60px"
          />
        </header>
        <Leaderboard />
        <div ref={lbRef}></div>
      </div>
    </ThemeProvider>
  );
}
