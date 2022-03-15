import { useState } from 'react';



function PostForm() {

  const [post, setPost] = useState('');
  const [title, setTitle] = useState('');
   

  const handleSubmit = (e) => {
    e.preventDefault();
    

    fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //add authorization header with 'bearer' + token here
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title,
        post
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  
  
    return (
      <div>
        <h1 className="text-light mb-3">Create a new Post!</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label
              htmlFor="title"
              className="form-label text-light">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="postTitle"
              onChange={(e) => setTitle(e.target.value)}
            />
            </div>
            <div className="mb-3">
            <label
              htmlFor="post"
              className="form-label text-light">
              Post It!
            </label>
            <textarea
              name='post'
              className="form-control"
              id="postText"
              rows="3"
              onChange={(e) => setPost(e.target.value)}>
            </textarea>
            </div>
            <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit} >
              Submit
            </button>
            </div>
          </form>
      </div>
   
  );
}

export default PostForm;