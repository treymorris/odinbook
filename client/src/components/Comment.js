
const { DateTime } = require("luxon");


function Comment({ comments, postid }) {

  let filtered = comments.filter((comment)=> comment.post === postid)

  return (
    <div>
      
      {filtered.map((comment) => (
        <div key={comment._id}>
          <p>{comment.comment}</p>
          <p>
            {DateTime.fromISO(comment.date).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Comment;
