import {useState, useEffect, useReducer} from 'react';
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

const quoteReducer = (state, action) => {
  switch (action.type) {
    case 'QUOTE_FAVORITE':
      return {
        ...state,
        [action.name]: action.payload,
      };
    case 'QUOTE_COMMENTS':
      return {
        ...state,
        [action.name]: [...action.payload],
      };
    default:
      return state;
  }
};
const CardQuote = ({add, img, remove, changeFavorite, eachQuote}) => {
  //const data = {...eachQuote}
  const newData = {img, isFavorite: false, rating: [], comments: []};
  const data = {...eachQuote, ...newData};
  const [quoteState, dispatch] = useReducer(quoteReducer, data);
  const [isFav, setIsFav] = useState(false);
  const [rating, setRating] = useState(0);
  //***************
  const updateLocal = () => {
    const getLocal = JSON.parse(localStorage.getItem(quoteState.quote_id));
    if (getLocal) {
        dispatch({
          type: 'QUOTE_FAVORITE',
          name: 'isFavorite',
          payload: getLocal.isFavorite,
        });
      if (getLocal.comments) {
        dispatch({
          type: 'QUOTE_COMMENTS',
          name: 'comments',
          payload: getLocal.comments,
        });
      }
      if (getLocal.rating.length) {
        let num = 0;
        getLocal.rating.map(each => (num = num + parseInt(each)));
        const totalRating = Math.ceil(num / getLocal.rating.length);
        setRating(totalRating);
      }
    }
  };
  useEffect(() => {
    updateLocal();
  }, []);
  //***************

  const setLocalFav = () => {
    const getLocal = JSON.parse(localStorage.getItem(quoteState.quote_id));
    if (getLocal) {
      getLocal.isFavorite = !getLocal.isFavorite;
      localStorage.setItem(getLocal.quote_id, JSON.stringify(getLocal));
    } else {
      quoteState.isFavorite = !quoteState.isFavorite;
      localStorage.setItem(quoteState.quote_id, JSON.stringify(quoteState));
    }
    updateLocal();
  };
  const removeLocalFav = fav => {
    const removeFav = JSON.parse(localStorage.getItem(quoteState.quote_id));
    removeFav.isFavorite = false;
    localStorage.setItem(removeFav.quote_id, JSON.stringify(removeFav));

    //función para actualizar el estado del componente padre
    updateLocal();
    changeFavorite();
  };

  const setNewComment = e => {
    const getLocal = JSON.parse(localStorage.getItem(quoteState.quote_id));
    if (getLocal) {
      getLocal.comments = [...getLocal.comments, e];
      localStorage.setItem(getLocal.quote_id, JSON.stringify(getLocal));
    } else {
      quoteState.comments = [...quoteState.comments, e];
      localStorage.setItem(quoteState.quote_id, JSON.stringify(quoteState));
    }
    updateLocal();
  };
  const handleRating = ran => {
    const getLocal = JSON.parse(localStorage.getItem(quoteState.quote_id));
    if (getLocal) {
      getLocal.rating = [...getLocal.rating, ran];
      localStorage.setItem(getLocal.quote_id, JSON.stringify(getLocal));
    } else {
      quoteState.rating = [...quoteState.rating, ran];
      localStorage.setItem(quoteState.quote_id, JSON.stringify(quoteState));
    }
    updateLocal();
  };
  return (
    <div className="mainQuotes">
      <div className="wrapperQuote ">
        <div className="eachQuote ">
          <div className="quote">
            <i>
              {remove && (
                <img src={eachQuote.img} alt={quoteState.author} width="50" />
              )}
              <FormatQuote />
              {quoteState.quote}
            </i>
          </div>
          <div className="controlsQuote">
            <Rating
              key={Math.random()}
              star={star}
              rating={rating}
              handleRating={handleRating}
            />
            <button
              title="Add my favorite"
              value={quoteState.quote_id}
              onClick={setLocalFav}
              className="addFavorite">
              {quoteState.isFavorite ? (
                <Favorite style={{color: '#f00'}} />
              ) : (
                <Favorite style={{color: '#777'}} />
              )}
            </button>
            {remove && (
              <button
                title="Remove from my favorite"
                onClick={removeLocalFav}
                className="removeFavorite">
                <DeleteForever />
              </button>
            )}
          </div>
        </div>
        <div className="authorQuote">
          {remove && <i>{quoteState.author}</i>}
        </div>
        <Comments allComments={quoteState.comments} />
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
