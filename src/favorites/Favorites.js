import {useEffect, useState} from 'react';
import CardQuote from '../components/cardQuote/CardQuote';

const Favorites = () => {
  const [data, setData] = useState([]);
  const changeFavorite = () => {
    setData([]); //resetamos el array para que no se duplique
    Object.keys(localStorage).forEach(clave => {
      const getData = JSON.parse(localStorage.getItem(clave));
      if (getData.isFavorite) {
        setData(dat => [...dat, getData]);
      }
    });
  };
  useEffect(() => {
    changeFavorite();
  }, []);

  return (
    <div className="home">
      {data.length ? (
        data.map(each => (
          <CardQuote
            changeFavorite={changeFavorite}
            key={Math.random()}
            eachQuote={each}
            add={false}
            remove={true}
          />
        ))
      ) : (
        <p style={{color: '#fff'}}>You don´t have Favorites</p>
      )}
    </div>
  );
};

export default Favorites;
