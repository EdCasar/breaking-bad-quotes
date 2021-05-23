import {useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import {Favorite, FormatQuote, Star} from '@material-ui/icons';
const star = [1, 2, 3, 4, 5];

const CardQuote = ({quote_id, quote, author, img, series, add, remove}) => {
	const [isFav, setIsFav ]= useState(false)
  const fav = {
    quote_id,
    quote,
    author,
    img,
  };
  const setLocalFav = e => {
      localStorage.setItem(
       e.quote_id, 
        JSON.stringify(e),
      );
    console.log(e);
	  setIsFav(true)
  };
  return (
    <div className="mainQuotes">
      <div className="wrapperQuote ">
        <div className="eachQuote ">
          <div className="quote">
            <i>
	          {
               remove && <img src={img} width='50' />
			  }
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
				{
                  isFav
					? <Favorite style={{color: '#f00'}}/>
					: <Favorite style={{color: '#777'}}/>
				}
              </button>
            )}
            {remove && (
              <button
                title="Remove from my favorite"
                className="removeFavorite">
                <Favorite />
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
  add: PropTypes.bool,
  remove: PropTypes.bool,
};
export default CardQuote;
