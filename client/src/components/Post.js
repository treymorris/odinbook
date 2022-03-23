import React, { useState, useEffect } from 'react';


function Post() {

    useEffect(() => {
        fetchItems();
    }, []);


    const fetchItems = async () => {
        const data = await fetch('api/posts');
        const posts = await data.json();

        setPosts(posts.post_list)
    };

    const [posts, setPosts] = useState([]);

    return (
        
        <div className='container-fluid'>
            <h5 className='text-light'>Posts</h5>
            {posts.map(post => (
            <div className="card w-75" key={post._id}>
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