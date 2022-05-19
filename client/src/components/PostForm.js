import { useState } from "react";

function PostForm({ userid, fetchUser }) {
  const [post, setPost] = useState({
    text: "",
    title: "",
  });

  const handleChange = (e) => {
    console.log(post);
    const { name, value } = e.target;
    setPost((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: post.title,
          post: post.text,
          _id: userid,
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchUser()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form >
        <div className="mb-3 pt-2">
          <input
            type="text"
            name="title"
            className="form-control"
            id="postTitle"
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="text"
            className="form-control"
            id="postText"
            placeholder="Whaddya say today?"
            onChange={handleChange}
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
