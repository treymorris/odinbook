import { useEffect, useState } from "react";

const { DateTime } = require("luxon");


function Comment({  postid }) {
  //console.log('comment page', comments )
  //console.log("comment page", authorId)
  //let matched = comments.filter((comment)=> comment.post === postid)
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const data = await fetch(`api/comments/${postid}`);
    const comments = await data.json();
    setComments(comments.comments);
  };
  
  console.log('comments by post',comments)

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="mt-1 d-flex justify-content-between bg-dark text-light">
          <p className="p-3 my-auto" >{comment.comment}</p>
          <p>{comment.author.username}</p>
          <p className="p-1" >
            {DateTime.fromISO(comment.date).toLocaleString(
              DateTime.DATETIME_SHORT
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Comment;
