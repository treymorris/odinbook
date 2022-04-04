
import Comment from './Comment'
import CommentForm from './CommentForm'
const { DateTime } = require('luxon');

function Post(props) {
    
   
    // useEffect(() => {
    //     fetchItems();
    // }, []);

    // const fetchItems = async () => {
    //     const data = await fetch(`api/posts`);
    //     const posts = await data.json();
    //     setPosts(posts.post_list)
    // };

    // const [posts, setPosts] = useState([]);

    const handleLike = (like) => {
        fetch('/api/posts/like', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              id: like
            })
          })
    }

    return (
        
        <div className='container-fluid'>
            <h5 className='text-light'>Posts</h5>
            {props.usersPosts.map(post => (
                <div className="card w-100 list-group-flush border border-primary" key={post._id}>
                    <img src="" className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title text-dark">{post.title}</h5>
                            <p className="card-text">{post.post}</p>
                            <h6>{post.user.username}</h6>
                            <p>{DateTime.fromISO(post.date).toLocaleString(DateTime.DATETIME_MED)}</p>
                            <button onClick={() => handleLike(post._id)} className='btn btn-outline-primary btn-sm w-25 position-relative'>Like <span className='badge bg-primary position-absolute top-0 start-100 translate-middle'>{post.likes.length}</span></button>
                            <Comment />
                            <CommentForm postid={post._id}/>
                    </div>
                </div>
            ))};
        </div>
    );
}

export default Post;