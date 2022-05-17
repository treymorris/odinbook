import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const userid = localStorage.getItem("userid");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //add authorization header with 'bearer' + token here
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        post,
        _id: userid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/UserHome");
      })
      .catch((error) => {
        console.log("Error:", error);
        navigate("/");
      });
  };

  return (
    <div>
      {/* <h1 className="text-light  text-center mb-5 mt-5">Create a new Post!</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 pt-3">
          <input
            type="text"
            className="form-control"
            id="postTitle"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="content"
            className="form-control"
            id="postText"
            placeholder="Whaddya say today?"
            // rows="3"
            onChange={(e) => setPost(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={handleSubmit}
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
