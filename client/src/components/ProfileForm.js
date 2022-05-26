import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function ProfileForm() {

  const { id } = useParams();
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [bio, setBio] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/users/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        birthday: birthday,
        bio: bio,
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
      <h1 className="text-light text-center">Profile Update</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <div className="mb-3 w-50 mx-auto">
            <input
              type="text"
              placeholder="First Name"
              className="form-control form-control-sm"
              id="firstname"
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="mb-3 w-50 mx-auto">
            <input
              type="text"
              placeholder="Last Name"
              className="form-control form-control-sm"
              id="lastname"
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="mb-3 w-50 mx-auto">
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-sm"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 w-50 mx-auto">
            <input
              type="username"
              placeholder="Username"
              className="form-control form-control-sm"
              id="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3 w-50 mx-auto">
            <input
              type="date"
              placeholder="Birth Date"
              className="form-control form-control-sm"
              id="birthday"
              required
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className="mb-3 w-50 mx-auto">
            <textarea
              name="bio"
              placeholder="Bio"
              className="form-control form-control-sm"
              id="bio"
              required
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
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
