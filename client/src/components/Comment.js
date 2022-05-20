
const { DateTime } = require("luxon");


function Comment({ comments, postid }) {

  let filtered = comments.filter((comment)=> comment.post === postid)

  return (
    <div>
      {filtered.map((comment) => (
        <div key={comment._id} className="mt-1 d-flex justify-content-between bg-dark text-light">
          <p className="p-3 my-auto" >{comment.comment}</p>
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
