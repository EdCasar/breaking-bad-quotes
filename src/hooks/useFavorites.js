import {useState, useEffect} from 'react';

const useFavorites = () => {
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    setFavorite([]); //resetamos el array para que no se duplique
    const keys = Object.keys(localStorage);
    keys.forEach(clave => {
      if (clave !== 'lastKeyword' && clave !== 'debug') {
        const newData = localStorage.getItem(clave);
        const totalData = JSON.parse(newData);
        if (totalData.isFavorite) {
          setFavorite(dat => [...dat, totalData]);
        }
      }
    });
  }, []);
  return favorite;
};

export default useFavorites;
