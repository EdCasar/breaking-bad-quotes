import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Favorite, DeleteForever, FormatQuote, Star} from '@material-ui/icons';
const star = [1, 2, 3, 4, 5];

const CardQuote = ({
  quote_id,
  quote,
  author,
  img,
  series,
  add,
  remove,
  changeFavorite,
}) => {
  const [isFav, setIsFav] = useState(false);
  const [ofFav, setOfFav] = useState();
  const [rating, setRating] = useState(0);
  const fav = {
    quote_id,
    quote,
    author,
    img,
    isFavorite: false,
    rating: [],
  };
	
  const setLocalFav = fav => {
    fav.isFavorite = true;
    localStorage.setItem(fav.quote_id, JSON.stringify(fav));
    setIsFav(true);
  };
  const removeLocalFav = fav => {
    const removeFav = JSON.parse(localStorage.getItem(quote_id));
    removeFav.isFavorite = false;
    localStorage.setItem(fav.quote_id, JSON.stringify(removeFav));
    setIsFav(false);

    //función para actualizar el estado del componente padre
    changeFavorite();
  };

  const handleRating = ran => {
    const ratingFav = JSON.parse(localStorage.getItem(quote_id));
    if (ratingFav) {
      ratingFav.rating.push(ran);
      localStorage.setItem(fav.quote_id, JSON.stringify(ratingFav));
    } else {
      fav.rating.push(ran);
      localStorage.setItem(fav.quote_id, JSON.stringify(fav));
    }
    setRating();
  };
  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem(quote_id));
    if (getLocal) {
      if (getLocal.isFavorite) {
        setOfFav(getLocal);
      }
      if (getLocal.rating.length) {
        let num = 0;
        getLocal.rating.map(each => {
          num = num + parseInt(each);
        });
        let totalRating = Math.ceil(num / getLocal.rating.length);
        setRating(totalRating);
      }
    }

    // console.log(getLocal);
  }, [isFav, rating]);
  return (
    <div className="mainQuotes">
      <div className="wrapperQuote ">
        <div className="eachQuote ">
          <div className="quote">
            <i>
              {remove && <img src={img} width="50" />}
              <FormatQuote />
              {quote}
            </i>
          </div>
          <div className="controlsQuote">
            <div>
              {star.map(str => (
                <>
                  {rating >= str ? (
                    <Star
                      key={str}
                      style={{fontSize: 12, color: '#ff0'}}
                      onClick={() => handleRating(`${str}`)}
                    />
                  ) : (
                    <Star
                      key={str}
                      style={{fontSize: 12, color: '#888'}}
                      onClick={() => handleRating(`${str}`)}
                    />
                  )}
                </>
              ))}
            </div>
            {add && (
              <button
                title="Add my favorite"
                value={quote_id}
                onClick={() => setLocalFav(fav)}
                className="addFavorite">
                {isFav || ofFav ? (
                  <Favorite style={{color: '#f00'}} />
                ) : (
                  <Favorite style={{color: '#777'}} />
                )}
              </button>
            )}
            {remove && (
              <button
                title="Remove from my favorite"
                onClick={() => removeLocalFav(fav)}
                className="removeFavorite">
                <DeleteForever />
              </button>
            )}
          </div>
        </div>
        <div className="authorQuote">{remove && <i>{author}</i>}</div>
      </div>
    </div>
  );
};

CardQuote.propTypes = {
  quote_id: PropTypes.number,
  quote: PropTypes.string,
  author: PropTypes.string,
  series: PropTypes.string,
  img: PropTypes.string,
  add: PropTypes.bool,
  remove: PropTypes.bool,
  changeFavorite: PropTypes.func,
};
export default CardQuote;
