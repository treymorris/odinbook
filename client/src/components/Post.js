import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
const { DateTime } = require("luxon");

function Post({ usersPosts, userImage, comments, handleLike, userid }) {
  return (
    <div>
      {usersPosts.map((post) => (
        <div
          className="card w-100 list-group-flush border border-primary"
          key={post._id}
        >
          <div className="d-flex align-items-center ms-1 p-2">
            <img src={userImage} className="shrink" alt="post author" />
            <h6 className="ms-3 mb-0">{post.user.username}</h6>
            <p className="ms-auto mb-0">
              {DateTime.fromISO(post.date).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </p>
          </div>
          <div className="card-body">
            <h5 className="card-title text-dark">{post.title}</h5>
            <p className="card-text">{post.post}</p>
            <button
              onClick={() => handleLike(post._id)}
              className="btn btn-outline-primary btn-sm position-relative"
            >
              <FontAwesomeIcon icon={faThumbsUp} size="2x" />
              <span className="badge bg-primary position-absolute top-0 start-100 translate-middle">
                {post.likes.length}
              </span>
            </button>
            <h5 className="mt-3">Comments:</h5>
            <Comment comments={comments} postid={post._id} />
            <CommentForm postid={post._id} userid={userid} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
