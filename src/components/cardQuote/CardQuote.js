import PropTypes from 'prop-types';
import {Favorite, FormatQuote, Star} from '@material-ui/icons';
const star = [1, 2, 3, 4, 5];

const CardQuote = ({quote_id, quote, author, series, add, remove}) => {
  return (
    <div className="mainQuotes">
      <div className="wrapperQuote ">
        <div className="eachQuote ">
          <div className="quote">
            <i>
              <FormatQuote />
              {quote}
            </i>
          </div>
          <div className="controlsQuote">
            <div>
              {star.map(str => (
                <Star style={{fontSize: 12, color: '#777'}} />
              ))}
            </div>
            {add && (
              <button
                title="Add my favorite"
                value={quote_id}
                className="addFavorite">
                <Favorite />
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
