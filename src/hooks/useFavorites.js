import {useState} from 'react';

const useFavorites = () => {
  const [favorite, setFavorite] = useState([]);

  const addFavorite = e => {
	  setFavorite(state => [...state, e])
  };
  return [favorite, addFavorite];
};

export default useFavorites;
