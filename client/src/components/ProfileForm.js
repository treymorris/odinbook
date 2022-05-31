
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import  Navbar from "./Navbar"
const { DateTime } = require("luxon");

function ProfileForm() {
  // console.log(user)
  //console.log(id)
  const { id } = useParams();
  let navigate = useNavigate();
  
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    birth_date: '',
    hobbies: '',
    bio: '',
    profile_pic: ''
  })

  //const [user, setUser] = useState({})

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    const data = await fetch(`/api/users/${id}`);
    const user = await data.json();
    setUser(user.user);
    console.log("user profile page", user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevInfo) => {
      return { ...prevInfo, [name]: value };
    });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/users/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        birth_date: user.birth_date,
        bio: user.bio,
        hobbies: user.hobbies,
        profile_pic: user.profile_pic,
        _id: id
      }),
    })
      .then((response) => response.json()) //catch token here and save to local storage
      .then((data) => {
        console.log(data);
        navigate(`/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-light text-center mt-3">Profile Update</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              value={user.firstname || ""}
              name="firstname"
              type="text"
              placeholder="First Name"
              className="form-control form-control-sm"
              id="firstname"
              onChange={handleChange}
            />
            <label htmlFor="firstname">First Name</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              value={user.lastname || ""}
              name="lastname"
              type="text"
              placeholder="Last Name"
              className="form-control form-control-sm"
              id="lastname"
              onChange={handleChange}
            />
            <label htmlFor="lastname">Last Name</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              value={user.email || ""}
              name="email"
              type="email"
              placeholder="Email"
              className="form-control form-control-sm"
              id="email"
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              value={user.username || ""}
              name="username"
              type="username"
              placeholder="Username"
              className="form-control form-control-sm"
              id="username"
              onChange={handleChange}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              value={DateTime.fromISO(user.birth_date).toISODate() || ""}
              name="birth_date"
              type="date"
              placeholder="Birth Date"
              className="form-control form-control-sm"
              id="birth_date"
              onChange={handleChange}
            />
            <label htmlFor="birth_date">Birth Date</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <textarea
              value={user.hobbies || ""}
              name="hobbies"
              type="text"
              placeholder="Hobbies"
              className="form-control form-control-sm"
              id="hobbies"
              onChange={handleChange}
            />
            <label htmlFor="hobbies">Hobbies</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <textarea
              value={user.bio || ""}
              name="bio"
              placeholder="Bio"
              className="form-control form-control-sm"
              id="bio"
              onChange={handleChange}
            />
            <label htmlFor="bio">Bio</label>
          </div>
        </div>
        <div className="mb-3 w-50 mx-auto form-floating">
          <input
            className="form-control form-control-sm"
            type="text"
            name="profile_pic"
            onChange={handleChange}
          />
          <label htmlFor="profile_pic">Enter Profile Pic URL</label>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
