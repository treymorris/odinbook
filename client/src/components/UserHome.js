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
        }),
      });
      const data = await response.json();
      console.log(data);
      fetchFriends();
      fetchAccepted();
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
      fetchFriends();
      fetchAccepted();
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const userid = localStorage.getItem("userid");

  const userImage = user.profile_pic
    ? user.profile_pic
    : "https://via.placeholder.com/150";

  useEffect(() => {
    fetchUser();
    fetchUsers();
    fetchFriends();
    fetchAccepted();
  }, []);

  const fetchUser = async () => {
    const data = await fetch(`/api/users/${userid}`);
    const user = await data.json();
    setUser(user.user);
    setUsersPosts(user.users_posts);
    setComments(user.comments);
  };

  const fetchUsers = async () => {
    const data = await fetch("api/users");
    const users = await data.json();
    setUsers(users.user_list);
  };

  const fetchFriends = async () => {
    const data = await fetch("api/friends/pending");
    const friends = await data.json();
    setFriends(friends.data);
  };

  const fetchAccepted = async () => {
    const data = await fetch("api/friends/accepted");
    const accepted = await data.json();
    setAccepted(accepted.data);
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

  const filtered = users.filter((user) => user._id !== userid); //list of users need to fix to exclude friends
  const filteredFriends = friends.filter((friend) => friend.to._id === userid); //list of users that have sent friend requests
  const friendsAccepted = accepted.filter(
    (accepted) => accepted.to._id === userid
  );
  console.log(friendsAccepted);
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
            <p className="text-light ms-2 mb-0 pt-1">{user.username}</p>
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
            usersPosts={usersPosts}
            fetchUser={fetchUser}
          />
        </div>
        <div className="friendsHome col">
          <div className="container-fluid">
            <h5 className="text-light p-2">Friends</h5>
            {friendsAccepted.map((accepted) => (
              <div
                key={accepted._id}
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
            {filteredFriends.map((friend) => (
              <div key={friend._id} className="border border-primary">
                <Link
                  className="p-3 nav-link text-light bg-secondary w-100"
                  to={`/${friend.from._id}`}
                >
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
          {filtered.map((filter) => (
            <NavLink
              key={filter._id}
              className="p-3 ms-4 nav-link  bg-dark w-85 border border-primary"
              userid={userid}
              to={`/${filter._id}`}
            >
              <img
                src={filter.profile_pic || "https://via.placeholder.com/150"}
                alt="user profile"
                className="shrink me-3"
              ></img>
              {filter.username}
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
