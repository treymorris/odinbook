import React, { useState, useEffect } from 'react';
const { DateTime } = require('luxon');

function Post(props) {

    useEffect(() => {
        fetchItems();
    }, []);

    console.log(props.usersPosts)
    const fetchItems = async () => {
        const data = await fetch(`api/posts`);
        const posts = await data.json();

        setPosts(posts.post_list)
    };

    const [posts, setPosts] = useState([]);
    
    return (
        
        <div className='container-fluid'>
            <h5 className='text-light'>Posts</h5>
            {props.usersPosts.map(post => (
            <div className="card w-100 list-group-flush border border-primary" key={post._id}>
                <img src="" className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title text-dark">{post.title}</h5>
                        <p className="card-text">{post.post}</p>
                        <p>{post.user.username}</p>
                    <p>{DateTime.fromISO(post.date).toLocaleString(DateTime.DATETIME_MED)}</p>
                        <button className="btn btn-outline-primary btn-sm">Edit</button>
                        <button className='btn btn-outline-primary btn-sm'>Like</button>
                        <button className='btn btn-outline-primary btn-sm'>Comment</button>
                </div>
            </div>
            ))}
             
       </div>
    
  );
}

export default Post;