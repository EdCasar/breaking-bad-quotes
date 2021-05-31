import {AccountCircle} from '@material-ui/icons';
const Comments = ({allComments}) => {
  return (
    <ul className="ShowComments">
      {allComments.length ? (
        allComments.map(each => (
          <li key={Math.random()}>
            <AccountCircle />
            {each}
          </li>
        ))
      ) : (
        <p >Not comments</p>
      )}
    </ul>
  );
};
export default Comments;
