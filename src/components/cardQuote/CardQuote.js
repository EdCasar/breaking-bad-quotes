import {useState, useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {Favorite, DeleteForever} from '@material-ui/icons';
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
const CardQuote = ({eachQuote, img, changeFavorite, remove = false}) => {
  const newData = {img, isFavorite: false, rating: [], comments: []};
  const data = {...eachQuote, ...newData};
  const [quoteState, dispatch] = useReducer(quoteReducer, data);
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
      dispatch({
        type: 'QUOTE_COMMENTS',
        name: 'comments',
        payload: getLocal.comments,
      });
      let num = 0;
      getLocal.rating.map(each => (num = num + parseInt(each)));
      const totalRating = Math.ceil(num / getLocal.rating.length);
      setRating(totalRating);
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
    remove && changeFavorite();
  };

  const handlerState = (name, e) => {
    const getLocal = JSON.parse(localStorage.getItem(quoteState.quote_id));
    if (getLocal) {
      getLocal[name] = [...getLocal[name], e];
      localStorage.setItem(getLocal.quote_id, JSON.stringify(getLocal));
    } else {
      quoteState[name] = [...quoteState[name], e];
      localStorage.setItem(quoteState.quote_id, JSON.stringify(quoteState));
    }
    updateLocal();
  };
  const setNewComment = e => {
    handlerState('comments', e);
  };
  const handleRating = ran => {
    handlerState('rating', ran);
  };
    
  return (
    <div className="mainQuotes">
      <div className="wrapperQuote ">
        <div className="eachQuote ">
          <div className="quote">
            <div className="quoteItem">
              {remove && (
                <img src={eachQuote.img} alt={quoteState.author} width="50" />
              )}
              <p>{quoteState.quote}</p>
      
            </div>
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
                onClick={setLocalFav}
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
  eachQuote: PropTypes.object,
  img: PropTypes.string,
  remove: PropTypes.bool,
  changeFavorite: PropTypes.func,
};
export default CardQuote;
