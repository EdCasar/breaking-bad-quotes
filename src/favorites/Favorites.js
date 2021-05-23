import {useEffect, useState} from 'react';
import useFavorites from '../hooks/useFavorites';
//import useQuotes from '../hooks/useQuotes'
import CardQuote from '../components/cardQuote/CardQuote';

const Favorites = () => {
  //	const quote = useQuotes()
  const [favorite] = useFavorites();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([]); //resetamos el array para que no se duplique
    const keys = Object.keys(localStorage);
    keys.forEach(clave => {
      if (clave !== 'lastKeyword' && clave !== 'debug') {
        const newData = localStorage.getItem(clave);
        setData(dat => [...dat, JSON.parse(newData)]);
      }
    });
  }, []);

  return (
    <div className="home">
      {data.length ? (
        data.map(each => (
          <CardQuote key={each.quote_id} {...each} add={false} remove={true} />
        ))
      ) : (
        <p style={{color: '#fff'}}>You don´t have Favorites</p>
      )}
    </div>
  );
};

export default Favorites;
