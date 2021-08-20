import React, { useContext } from 'react';
import classes from './css/WordPreview.module.scss';
import { WordsContext } from '../../context/WordsContext';

const WordPreview = () => {
  const { wordArray, currentWord } = useContext(WordsContext);
  const currentWordIndex = wordArray.indexOf(currentWord);
  return (
    <>
      <br />
      <h2 className={classes.secondWord}>{wordArray[currentWordIndex + 1]}</h2>
      <br />
      <h3 className={classes.thirdWord}>{wordArray[currentWordIndex + 2]}</h3>
    </>
  );
};

export default WordPreview;
