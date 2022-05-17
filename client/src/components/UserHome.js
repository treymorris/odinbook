import Navbar from "./Navbar";
import Post from "./Post";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";


function Home() {
  const handleAccept = (friend) => {
    fetch("/api/friends/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: friend,
      }),
    });
  };

  const handleDecline = (friend) => {
    fetch("/api/friends/decline", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: friend,
      }),
    });
  };

  const userid = localStorage.getItem("userid");
  const [user, setUser] = useState({});
  const [usersPosts, setUsersPosts] = useState([]);
  const userImage = user.profile_pic
    ? user.profile_pic
    : "https://via.placeholder.com/150";

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await fetch(`/api/users/${userid}`);
    const user = await data.json();
    setUser(user.user);
    setUsersPosts(user.users_posts);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch("api/users");
    const users = await data.json();
    setUsers(users.user_list);
  };

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const data = await fetch("api/friends/pending");
    const friends = await data.json();
    setFriends(friends.data);
  };

  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    fetchAccepted();
  }, []);

  const fetchAccepted = async () => {
    const data = await fetch("api/friends/accepted");
    const accepted = await data.json();
    setAccepted(accepted.data);
    console.log(accepted.data);
  };

  const filtered = users.filter((user) => user._id !== userid); //list of users need to fix to exclude friends
  const filteredFriends = friends.filter((friend) => friend.to._id === userid); //list of users that have sent friend requests
  const friendsAccepted = accepted.filter(
    (accepted) => accepted.to._id === userid
  );

  return (
    <div className="bg-dark">
      <Navbar />
      <div className="row">
        <div className="homeProfile col">
          <div className="d-flex align-items-center bg-secondary border border-primary">
            <img
              src={userImage}
              alt="user profile"
              className="shrink p-1 "
            ></img>
            <p className="text-light ms-3">{user.username}</p>
          </div>
          <p className="text-light bg-secondary m-0 p-4 border border-primary">
            friends
          </p>
          <p className="text-light bg-secondary m-0 p-4 border border-primary">
            account
          </p>
        </div>
        <div className="postFormHome container w-50 col-6">
          <PostForm />
        </div>
        <div className="friendsHome col">
          <div className="container-fluid">
            <h5 className="text-light p-2">Friends</h5>
            {friendsAccepted.map((accepted) => (
              <div
                key={accepted._id}
                className="bg-secondary text-light border border-primary p-3"
              >
                {accepted.from.username}
              </div>
            ))}
          </div>
          <div id="friend-sidebar" className="container-fluid">
            <h5 className="text-light p-2">Friend Requests</h5>
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
          <h5 className="text-light p-3">Users</h5>
          {filtered.map((filter) => (
            <Link
              key={filter._id}
              className="p-3 nav-link text-light bg-secondary w-100 border border-primary"
              userid={userid}
              to={`/${filter._id}`}
            >
              {filter.username}
            </Link>
          ))}
        </div>
        <div className="postsHome col-6">
          <Post userid={userid} usersPosts={usersPosts} />
        </div>
      </div>
    </div>
  );
}

export default Home;
