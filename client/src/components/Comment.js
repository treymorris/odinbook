import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
const { DateTime } = require("luxon");


function Comment({  postid, userid, fetchUser, authorId }) {
  
   const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchComments = async () => {
    const data = await fetch(`api/comments/${postid}`);
    const comments = await data.json();
    setComments(comments.comments);
  };
  
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          <div className=" p-2 mt-1 d-flex align-items-center bg-dark text-light">
            <img
              src={comment.author.profile_pic}
              className="ms-2 shrink"
              alt="post author"
            />
            <p className="mb-0 ms-3">{comment.author.username}</p>
            <p className="ms-auto mb-0">
              {DateTime.fromISO(comment.date).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </p>
          </div>
          <p className="p-3 my-auto bg-dark text-light">{comment.comment}</p>
        </div>
      ))}
      <CommentForm
        postid={postid}
        userid={userid}
        fetchUser={fetchUser}
        authorId={authorId}
        fetchComments={fetchComments}
      />
    </div>
  );
}

export default Comment;
