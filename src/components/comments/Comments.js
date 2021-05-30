const Comments = () => {
  const comments = null;
  return (
		<ul className="ShowComments">
	      {comments 
			  ? comments.map(each => <li>{each}</li>) 
			  : <p style={{ color: '#888'}}>Not comments</p>}
	    </ul>

  )
};
export default Comments;
