import { useState } from "react";


function CommentForm({ postid, userid, fetchUser, authorId, fetchComments }) {
  const [text, setText] = useState('');

  

  const handleFormReset = () => {
    setText('')
  }

  const handleKeyboard = (e) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") handleFormReset();
  };

  const handleSubmit = async () => {
    
    try {
      const response = await fetch("/api/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          comment: text,
          user: userid,
          author: authorId,
          post: postid,
        }),
      })
      const data = await response.json();
      console.log("Success on fetch:", data);
      handleFormReset()
      fetchUser()
      fetchComments()
        }
        catch(error)  {
          console.log("Error:", error);
        };
      
    };

  return (
    <div>
      <div>
        <div className="mb-3">
          <textarea
            name="comment"
            className="form-control"
            id="commentText"
            placeholder="Add Comment Here..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyboard}
            value={text}
          ></textarea>
        </div>
        {/* <div>
          <button
            type="button"
            className="btn btn-primary position-relative top-0 start-50 translate-middle"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default CommentForm;
