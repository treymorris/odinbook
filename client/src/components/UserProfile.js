import "../App.css";
import PostForm from "./PostForm";
import Post from "./Post";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
const { DateTime } = require("luxon");

function UserIndex() {
  const { id } = useParams();
  const userid = localStorage.getItem("userid");
  //console.log('profile page',userid)
  const [usersPosts, setUsersPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({
    user: {},
    friends: [
      {
        from: {},
      },
    ],
  });
  let navigate = useNavigate();
  const userImage = user.user.profile_pic
    ? user.user.profile_pic
    : "https://via.placeholder.com/150";

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await fetch(`api/users/${id}`);
    const user = await data.json();
    //console.log(user);
    setUser(user);
    setUsersPosts(user.users_posts);
    setComments(user.comments);
  };
  
  const handleClick = async () => {
    try {
      const response = await fetch("/api/friends/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          from: userid,
          to: id,
        }),
      });
      const data = await response.json();
      console.log(data);
      navigate("/userHome");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch("/api/posts/like", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: postId,
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };
  console.log('user profile page',comments)

  return (
    <div>
      <Navbar />
      <div>
        <div className="d-flex">
          <div>
            <div className="ms-5 mt-5">
              <img src={userImage} alt="current user"></img>
            </div>
            <h1 className="text-light  my-auto ms-5">{user.user.username}</h1>
          </div>
          <div className="container w-50 mt-5">
            <PostForm userid={id} fetchUser={fetchUser} authorId={userid} />
            <Post
              usersPosts={usersPosts}
              userImage={userImage}
              comments={comments}
              handleLike={handleLike}
              userid={userid}
              fetchUser={fetchUser}
            />
          </div>
        </div>

        <div className="position-absolute top-50 start-0">
          <p className="text-light mt-5 p-1 ms-5">
            {user.user.firstname} {user.user.lastname}
          </p>
          <p className="text-light mt-2 p-1 ms-5">{user.user.email}</p>
          <p className="text-light mt-2 p-1 ms-5">
            Birthday:{" "}
            {DateTime.fromISO(user.user.birth_date).toLocaleString(
              DateTime.DATE_MED
            )}
          </p>
          <p className="text-light p-1 ms-5">Hobbies: {user.user.hobbies}</p>
          <p className="text-light p-1 ms-5">{user.user.bio}</p>
          <button
            className="btn btn-primary p-2 mt-3 ms-5"
            onClick={handleClick}
          >
            Send Friend Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserIndex;
