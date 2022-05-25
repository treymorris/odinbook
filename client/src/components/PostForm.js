import { useState } from "react";

function PostForm({ userid, fetchUser, authorId }) {
  const [post, setPost] = useState({
    text: "",
    title: "",
  });
//console.log('author id',authorId)
  const handleChange = (e) => {
    console.log(post);
    const { name, value } = e.target;
    setPost((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleFormReset = () => {
    setPost({
        text: "",
        title: ""
      }
    )
  }

  const handleKeyboard = (e) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === 'Escape') handleFormReset();
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
          author: authorId
        }),
      });
      const data = await response.json();
      console.log(data);
      handleFormReset()
      fetchUser()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <div className="mb-3 pt-2 ">
          <input
            type="text"
            name="title"
            className="form-control bg-dark text-light"
            id="postTitle"
            placeholder="Title"
            onChange={handleChange}
            onKeyDown={handleKeyboard}
            value={post.title}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="text"
            className="form-control bg-dark text-light"
            id="postText"
            placeholder="Whaddya say today?"
            onChange={handleChange}
            onKeyDown={handleKeyboard}
            value={post.text}
          ></textarea>
        </div>
        {/* <div>
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={handleSubmit}
          >
            Submit Post
          </button>
        </div> */}
      </form>
    </div>
  );
}

export default PostForm;
