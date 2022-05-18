
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CommentForm(props) {
  const [comment, setComment] = useState([]);
  const userid = localStorage.getItem("userid");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/comments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        comment: comment,
        user: userid,
        post: props.postid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success on fetch:", data);
        navigate("/UserHome");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            name="comment"
            className="form-control"
            id="commentText"
            placeholder="Add Comment Here..."
            rows="3"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary position-relative top-0 start-50 translate-middle"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
