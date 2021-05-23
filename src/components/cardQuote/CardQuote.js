import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Favorite,DeleteForever, FormatQuote, Star} from '@material-ui/icons';
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
  const fav = {
    quote_id,
    quote,
    author,
    img,
    isFavorite: false,
  };
  const setLocalFav = fav => {
    fav.isFavorite = !fav.isFavorite;
      localStorage.setItem(fav.quote_id, JSON.stringify(fav));
      setIsFav(true);
  };
  const removeLocalFav = fav => {
    fav.isFavorite = false;
    localStorage.removeItem(fav.quote_id);
    setIsFav(false);
    changeFavorite();
  };
  useEffect(() => {
    const joinFav = localStorage.getItem(quote_id);
    joinFav && setOfFav(joinFav);
  }, [isFav]);
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
                <Star key={str} style={{fontSize: 12, color: '#777'}} />
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
                <DeleteForever/>
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
