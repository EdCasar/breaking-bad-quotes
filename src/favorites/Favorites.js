//import { useEffect } from 'react'
import useFavorites from '../hooks/useFavorites' 
//import useQuotes from '../hooks/useQuotes'
import CardQuote from '../components/cardQuote/CardQuote';

const Favorites = () => {
//	const quote = useQuotes()
  const [ favorite ] = useFavorites()

  return (
    <div className="home">
	  {
		  favorite < 0
		  ? favorite.map( each => (
                  <CardQuote
                    key={each.quote_id}
                    {...each}
                    add={false}
                    remove={true}
                  />
		  ))
		  : <p style={{ color: '#fff'}}>You don´t have Favorites</p>
	  }
    </div>
  );
};

export default Favorites;
