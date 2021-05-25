import {useState, useEffect, memo} from 'react';
import useCharAndQuote from '../hooks/useCharAndQuote';
import Search from '../components/search/Search';
import Main from './Main';
import useSearch from '../hooks/useSearch';

const Home = () => {
  const charAndQuote = useCharAndQuote();
  const [data, setData] = useState();
  const [results, search, setSearchAll] = useSearch(data);

  useEffect(() => {
    setData(charAndQuote);
  },[charAndQuote]);
  //busqueda por filtros
  const searchInFields = (word, key) => {
    setSearchAll(word, key);
  };
  return (
    <div className="home">
      <div className="wrapperSearch">
        <Search
          searchInFields={searchInFields}
          searchFor={'char_id'}
          name="Character ID"
        />
        <Search
          searchInFields={searchInFields}
          searchFor={'name'}
          name="Author"
        />
      </div>
      <Main
        data={search.length > 0 ? results : data}
        change={search.length > 0 ? true : null}
      />
    </div>
  );
};

export default memo(Home);
