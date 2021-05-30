import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Favorite,
  DeleteForever,
  Textsms as FormatQuote,
} from '@material-ui/icons';
import Rating from '../rating/Rating';
import Comments from '../comments/Comments';
import NewComment from '../comments/NewComment';
const star = [1, 2, 3, 4, 5];

const CardQuote = ({ quote_id, quote, author, img, series, add, remove, changeFavorite, }) => {
  const [isFav, setIsFav] = useState(false);
  const [ofFav, setOfFav] = useState();
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const fav = { quote_id, quote, author, img, isFavorite: false, rating: [], comments: [], };

  const setLocalFav = fav => {
    const newFavorite = JSON.parse(localStorage.getItem(quote_id));
    if (newFavorite) {
        newFavorite.isFavorite = true;
        localStorage.setItem(newFavorite.quote_id, JSON.stringify(newFavorite));
        setIsFav(true);
      
    } else {
      fav.isFavorite = true;
      localStorage.setItem(fav.quote_id, JSON.stringify(fav));
      setIsFav(true);
    }
  };
  const removeLocalFav = fav => {
    const removeFav = JSON.parse(localStorage.getItem(quote_id));
    removeFav.isFavorite = false;
    localStorage.setItem(fav.quote_id, JSON.stringify(removeFav));
    setIsFav(false);

    //función para actualizar el estado del componente padre
    changeFavorite();
  };

  const setNewComment = e => {
    const newComment = JSON.parse(localStorage.getItem(quote_id));
    if (newComment) {
      if (newComment.comments) {
        newComment.comments = [...newComment.comments, e];
        localStorage.setItem(newComment.quote_id, JSON.stringify(newComment));
      }
    } else {
      fav.comments = [...fav.comments, e];
      localStorage.setItem(fav.quote_id, JSON.stringify(fav));
    }
  };
  const handleRating = ran => {
    const ratingFav = JSON.parse(localStorage.getItem(quote_id));
    if (ratingFav) {
      ratingFav.rating = [...ratingFav.rating, ran];
      localStorage.setItem(fav.quote_id, JSON.stringify(ratingFav));
    } else {
      fav.rating = [...fav.rating, ran];
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
        getLocal.rating.map(each => (num = num + parseInt(each)));
        let totalRating = Math.ceil(num / getLocal.rating.length);
        setRating(totalRating);
      }
    }
  }, [isFav, rating, quote_id]);
  return (
    <div className="mainQuotes">
      <div className="wrapperQuote ">
        <div className="eachQuote ">
          <div className="quote">
            <i>
              {remove && <img src={img} alt={author} width="50" />}
              <FormatQuote />
              {quote}
            </i>
          </div>
          <div className="controlsQuote">
            <Rating star={star} rating={rating} handleRating={handleRating} />
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
        <Comments />
        <NewComment setNewComment={setNewComment} />
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
