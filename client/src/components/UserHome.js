import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faGear } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Post from "./Post";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
function UserHome() {
  //TODO  make all fetch calls async

  const handleAccept = async (friend) => {
    try {
      const response = await fetch("/api/friends/accept", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: friend,
          user: userid,
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchUser();
      fetchFriendRequests();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecline = async (friend) => {
    try {
      const response = await fetch("/api/friends/declined", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: friend,
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchUser();
      fetchFriendRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState({
    user: {},
    friends: [
      {
        from: {},
      },
    ],
  });
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);
  const [comments, setComments] = useState([]);
  
  //console.log('user', user.user.profile_pic)

  const userid = localStorage.getItem("userid");
  const userImage = user.user.profile_pic
    ? user.user.profile_pic
    : "https://via.placeholder.com/150";

  useEffect(() => {
    fetchUser();
    fetchUsers();
    fetchFriendRequests();
  }, []);

  const fetchUser = async () => {
    const data = await fetch(`/api/users/${userid}`);
    const user = await data.json();
    setUser(user);
    setUsersPosts(user.users_posts);
    setComments(user.comments);
    console.log("user home page", user);
  };

  const fetchUsers = async () => {
    const data = await fetch("api/users");
    const users = await data.json();
    setUsers(users.users);
    //console.log("users", users);
  };

  const fetchFriendRequests = async () => {
    const data = await fetch("api/friends/pending");
    const friends = await data.json();
    setFriendRequests(friends.data);
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

  const requests = friendRequests.filter((friend) => friend.to._id === userid); //list of users that have sent friend requests
  let usersList = users.filter((user) => user._id !== userid); //list of users that are not me

  for (var i = usersList.length - 1; i >= 0; i--) {
    for (var j = 0; j < user.friends.length; j++) {
      if (usersList[i]._id === user.friends[j].from._id) {    //filter out friends from users list
        usersList.splice(i, 1);
      }
    }
  }

  return (
    <div className="bg-dark">
      <Navbar />
      <div className="row">
        <div className="homeProfile col-3">
          <div className="d-flex align-items-center bg-dark border border-primary ms-4 w-85">
            <img
              src={userImage}
              alt="user profile"
              className="shrink m-2"
            ></img>
            <Link to={`/${user.user._id}`} className="nav-link ps-2">
              <p className="mb-0 pt-1">{user.user.username}</p>
            </Link>
          </div>
          <div className="d-flex align-items-center bg-dark border border-primary ms-4 w-85 text-light">
            <div className="ms-3">
              <FontAwesomeIcon icon={faAddressBook} size="2x" />
            </div>
            <p className="text-light bg-dark m-0 p-3">Friends</p>
          </div>
          <div className="d-flex align-items-center bg-dark border border-primary ms-4 w-85 text-light">
            <div className="ms-3">
              <FontAwesomeIcon icon={faGear} size="2x" />
            </div>
            <p className="text-light bg-dark m-0 p-3">Account</p>
          </div>
        </div>
        <div className="postFormHome container w-50 ms-0 my-auto">
          <PostForm
            userid={userid}
            authorId={userid}
            fetchUser={fetchUser}
          />
        </div>
        <div className="friendsHome col">
          <div className="container-fluid">
            <h5 className="text-light p-2">Friends</h5>
            {user.friends.map((accepted, index) => (
              <div
                key={index}
                className="bg-dark text-light border border-primary p-2"
              >
                <Link
                  className="p-2 nav-link bg-dark w-100"
                  to={`/${accepted.from._id}`}
                >
                  <img
                    src={
                      accepted.from.profile_pic ||
                      "https://via.placeholder.com/150"
                    }
                    alt="user profile"
                    className="shrink me-3"
                  ></img>
                  {accepted.from.username}
                </Link>
              </div>
            ))}
          </div>
          <div id="friend-sidebar" className="container-fluid">
            <h5 className="text-light p-2 mt-2">Friend Requests</h5>
            {requests.map((friend) => (
              <div key={friend._id} className="border border-primary">
                <Link
                  className="p-3 nav-link bg-dark w-100"
                  to={`/${friend.from._id}`}
                >
                  <img
                    src={
                      friend.from.profile_pic ||
                      "https://via.placeholder.com/150"
                    }
                    alt="user profile"
                    className="shrink me-3"
                  ></img>
                  {friend.from.username}
                </Link>
                <button
                  className="btn btn-outline-primary w-50"
                  onClick={() => handleAccept(friend._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-outline-primary w-50"
                  onClick={() => handleDecline(friend._id)}
                >
                  Decline
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="w-25 col-1">
          <h5 className="text-light p-3 ms-3">Users</h5>
          {usersList.map((user) => (
            <NavLink
              key={user._id}
              className="p-3 ms-4 nav-link  bg-dark w-85 border border-primary"
              userid={userid}
              to={`/${user._id}`}
            >
              <img
                src={user.profile_pic || "https://via.placeholder.com/150"}
                alt="user profile"
                className="shrink me-3"
              ></img>
              {user.username}
            </NavLink>
          ))}
        </div>
        <div className="postsHome col-6">
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
    </div>
  );
}

export default UserHome;
