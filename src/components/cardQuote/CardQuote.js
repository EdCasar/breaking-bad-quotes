import PropTypes from 'prop-types';

const CardQuote = ({quote_id, quote, author, series, add, remove}) => {
  return (
    <div>
      <div>
        <div>
          <i>{quote}</i>
        </div>
        <div>
          {add && <button>add</button>}
          {remove && <button>remove</button>}
        </div>
      </div>
	  <div>
	     {remove && <i>{author}</i>}
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
