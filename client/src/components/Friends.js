import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Friends() {
  const [user, setUser] = useState({
    user: {},
    friends: [
      {
        from: {},
        to: {},
      },
    ],
  });
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    const data = await fetch(`/api/users/${userid}`);
    const user = await data.json();
    setUser(user);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-light text-center mt-3 mb-5">Friends</h1>
      <div className="d-flex flex-wrap justify-content-evenly">
        {user.friends.map((accepted, index) => (
          <div
            className="card  bg-secondary p-3 mx-1 my-3 w-25 border-primary"
            key={index}
          >
            <img
              src={
                (accepted.from._id === user.user._id
                  ? accepted.to.profile_pic
                  : accepted.from.profile_pic) ||
                "https://via.placeholder.com/150"
              }
              className="card-img-top friendPic mx-auto"
              alt="user avatar"
            ></img>
            <div className="card-body">
              <h5 className="card-title text-center">
                {accepted.from.username === user.user.username
                  ? accepted.to.username
                  : accepted.from.username}
              </h5>
              <p className="card-text">
                {accepted.from.bio === user.user.bio
                  ? accepted.to.bio
                  : accepted.from.bio}
              </p>
              <Link
                className="p-2 nav-link bg-dark w-100 text-center"
                to={`/${
                  accepted.from._id === user.user._id
                    ? accepted.to._id
                    : accepted.from._id
                }`}
              >
                Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;
