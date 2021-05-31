const Comments = ({ allComments }) => {
  return (
		<ul className="ShowComments">
	      {allComments.length
			  ? allComments.map(each => <li key={Math.random()}>{each}</li>) 
			  : <p style={{ color: '#888'}}>Not comments</p>}
	    </ul>

  )
};
export default Comments;
