import "./App.css";
import { useEffect, useState } from "react";
import UserHome from "./components/UserHome";
import SignupForm from "./components/SignupForm";
import Login from "./components/Login";
import ProfileForm from "./components/ProfileForm";
import UserProfile from "./components/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
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
      console.log(data)
      fetchUser()
    } catch (error) {
      console.log(error)
    }
   
  }

  const filtered = users.filter((user) => user._id !== userid); //list of users need to fix to exclude friends
  const filteredFriends = friends.filter((friend) => friend.to._id === userid); //list of users that have sent friend requests
  const friendsAccepted = accepted.filter(
    (accepted) => accepted.to._id === userid
  );

  return (
    <div className="bg-dark">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/userHome"
            element={
              <UserHome
                userImage={userImage}
                user={user}
                friendsAccepted={friendsAccepted}
                filteredFriends={filteredFriends}
                filtered={filtered}
                userid={userid}
                usersPosts={usersPosts}
                fetchUser={fetchUser}
                comments={comments}
                handleLike={handleLike}
              />
            }
          />
          <Route path="/updateProfile" element={<ProfileForm />} />
          <Route path="/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
