import React, { useContext } from 'react';
import classes from './css/Highlighter.module.scss';
import useKeypress from '../../hooks/useKeypress';
import { WordsContext } from '../../context/WordsContext';
import { GameStateContext } from '../../context/GameStateContext';
import { Highlight } from 'react-highlight-regex';

const Highlighter = () => {
  const { currentWord, toHighlight, setToHighlight, substring } =
    useContext(WordsContext);

  const { isTimeOut } = useContext(GameStateContext);

  let regex = null;

  if (toHighlight) {
    regex = new RegExp(toHighlight);
  }

  useKeypress((e) => {
    if (currentWord && !isTimeOut) {
      // if a substring has been created (after a first character has been typed)
      if (substring) {
        // if it's the last character and the right letter...
        if (e.key === substring[0] && substring.length === 1) {
          setToHighlight('');
          // elif it's the right letter...
        } else if (e.key === substring[0]) {
          setToHighlight(toHighlight + e.key);
          // if it's the wrong letter
        } else {
          setToHighlight('');
        }
      } else if (e.key === currentWord[0]) {
        // if it's the right character of the first letter, set the substring and highlight
        setToHighlight(toHighlight + e.key);
      } else {
        //otherwise, switch the word out
        setToHighlight('');
      }
    }
  });

  return (
    <>
      {regex ? (
        <h1 className={classes.firstWord}>
          <Highlight
            match={regex}
            text={currentWord}
            highlightClassname={classes.highlight}
          />
        </h1>
      ) : (
        <h1 className={classes.firstWord}>{currentWord}</h1>
      )}
    </>
  );
};

export default Highlighter;
