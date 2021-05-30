import {useState, useRef} from 'react';
const NewComment = ({setNewComment}) => {
  const [comment, setComment] = useState();
	const input = useRef()
  const handlerInput = e => {
    setComment(e.target.value);
  };
  const handlerSubmit = e => {
    e.preventDefault();
    setNewComment(comment);
	  input.current.value = '' 
  };
  return (
    <form action="" className="newComment" onSubmit={handlerSubmit}>
      <input
	   ref={input}
        type="text"
        onChange={handlerInput}
        placeholder="Your comments Here"
      />
      <button>Send</button>
    </form>
  );
};
export default NewComment;
