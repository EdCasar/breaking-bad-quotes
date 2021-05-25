import {useState, useEffect} from 'react';

import useQuotes from '../hooks/useQuotes';
import useCharacters from '../hooks/useCharacters';

const useCharAndQuote = () => {
  const quote = useQuotes();
  const character = useCharacters();
  const [charAndQuote, setCharAndQuote] = useState([]);

  useEffect(() => {
    if (character) {
      character.map(each => { 
        if (quote) {
          const nameAll = quote.filter(fil => fil.author === each.name);
          if (nameAll.length > 0) {
            each.quotes = nameAll;
            setCharAndQuote(state => [...state, each]);
          }
        }
      });
    }
  }, [character, quote]);

  return charAndQuote;
};

export default useCharAndQuote;
