import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
const { DateTime } = require("luxon");

function Post({ usersPosts, userImage, comments, handleLike, userid, fetchUser }) {
  return (
    <div>
      {usersPosts.map((post) => (
        <div
          className="card w-100 list-group-flush"
          key={post._id}
        >
          <div className="d-flex align-items-center ms-1 p-2 border-bottom border-3">
            <img src={userImage} className="shrink" alt="post author" />
            <h6 className="ms-3 mb-0">{post.user.username}</h6>
            <p className="ms-auto mb-0">
              {DateTime.fromISO(post.date).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </p>
          </div>
          <div className="card-body bg-secondary">
            <div className="border border-2">
              <div className="d-flex justify-content-between p-3 bg-dark">
                <h5 className="card-title text-light">{post.title}</h5>
                <button
                  onClick={() => handleLike(post._id)}
                  className="btn btn-outline-primary btn-sm position-relative"
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span className="badge bg-primary position-absolute top-0 start-100 translate-middle">
                    {post.likes.length}
                  </span>
                </button>
              </div>
              <p className="card-text p-3 bg-dark text-light">{post.post}</p>
            </div>
            <h6 className="mt-3 p-2">Comments:</h6>
            <Comment comments={comments} postid={post._id} />
            <CommentForm
              postid={post._id}
              userid={userid}
              fetchUser={fetchUser}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
