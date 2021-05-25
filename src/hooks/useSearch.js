import {useEffect, useState} from 'react';

const useSearch = data => {
  const [dataIn, setDataIn] = useState();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(null);
  useEffect(() => {
    setDataIn(data);
  }, [data]);

  //Filtrando en cada campo
  const setSearchAll = (word, key) => {
    setSearch(word);
    if (word && dataIn) {
      const searchForFields = dataIn.filter(data => {
        if (typeof data[key] === 'number') {
          //si el objeto contine datos de tipo número lo convertimos a string
          return data[key].toString().includes(word.toLowerCase());
        } else {
          return data[key].toLowerCase().includes(word.toLowerCase());
        }
      });
      setResults(searchForFields);
    } else {
      setResults(dataIn);
    }
  };
  return [results, search, setSearchAll];
};
export default useSearch;
