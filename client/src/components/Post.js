import React, { useState, useEffect } from 'react';


function Post() {

    useEffect(() => {
        fetchItems();
    }, []);

    const [posts, setPosts] = useState([]);

    const fetchItems = async () => {

        const data = await fetch('/api/users/posts');

        const posts = await data.json();

        console.log(posts);
        setPosts(posts);
    };


    return (
        
        <div>
            {posts.map(post => (
            <div className="card" key={post._id}>
                <img src="" className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title text-dark">{post.title}</h5>
                    <p className="card-text">{post.post}</p>
                    <p>{post.date}</p>
                    <a href="www" className="link-warning">Edit</a>
                </div>
            </div>
            ))}
             
       </div>
    
  );
}

export default Post;