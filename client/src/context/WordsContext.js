import React, { createContext, useState } from 'react';

export const WordsContext = createContext();

const WordsContextProvider = (props) => {
  const [wordArray, setWordArray] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [toHighlight, setToHighlight] = useState('');
  const [substring, setSubstring] = useState(currentWord);

  return (
    <WordsContext.Provider
      value={{
        wordArray,
        setWordArray,
        currentWord,
        setCurrentWord,
        toHighlight,
        setToHighlight,
        substring,
        setSubstring,
      }}
    >
      {props.children}
    </WordsContext.Provider>
  );
};

export default WordsContextProvider;
