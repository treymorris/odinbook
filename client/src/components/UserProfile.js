import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
const { DateTime } = require("luxon");

function UserIndex() {
  const { id } = useParams();
  const userid = localStorage.getItem("userid");
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  const userImage = user.profile_pic
    ? user.profile_pic
    : "https://via.placeholder.com/150";

  useEffect(() => {
    fetchUser();
  }, []);
  
  
  const fetchUser = async () => {
    const data = await fetch(`api/users/${id}`);
    const user = await data.json();
    console.log(user.user);
    setUser(user.user);
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
          to: id
        }),
      });
      const data = await response.json();
      console.log(data);
      navigate("/userHome")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
        <div className="d-flex justify-content-center mt-5">
          <img src={userImage} alt="current user"></img>
                <h1 className="text-light text-center my-auto ms-5">
           {user.username}
                </h1>
        </div>
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <p className="text-light mt-5 p-1 ms-5">
            {user.firstname} {user.lastname}
          </p>
          <p className="text-light mt-2 p-1 ms-5">{user.email}</p>
          <p className="text-light mt-2 p-1 ms-5">
            Birthday:{" "}
            {DateTime.fromISO(user.birth_date).toLocaleString(
              DateTime.DATE_MED
            )}
          </p>
          <p className="text-light p-1 ms-5">Hobbies: {user.hobbies}</p>
          <p className="text-light p-1 ms-5">{user.bio}</p>
      <button className="btn btn-primary p-2 mt-3 ms-5" onClick={handleClick}>
        Send Friend Request
      </button>
        </div>
      </div>
    </div>
  );
}

export default UserIndex;
