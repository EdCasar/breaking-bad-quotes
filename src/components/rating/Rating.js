import PropTypes from 'prop-types';
import {Star} from '@material-ui/icons';

const Rating = ({star, rating, handleRating}) => {
  return (
    <div className="rating">
      {star.map(str => (
        <span key={Math.random()}>
          {rating >= str ? (
            <Star
              key={Math.random()}
              style={{fontSize: 12, color: '#ff0'}}
              onClick={() => handleRating(`${str}`)}
            />
          ) : (
            <Star
              key={Math.random()}
              style={{fontSize: 12, color: '#888'}}
              onClick={() => handleRating(`${str}`)}
            />
          )}
        </span>
      ))}
    </div>
  );
};
Rating.propTypes = {
  start: PropTypes.string,
  rating: PropTypes.number,
  handleRating: PropTypes.func,
};
export default Rating;
