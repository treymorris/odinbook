import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = () => {
    //e.preventDefault();

    fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((response) => response.json()) //catch token here and save to local storage
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyboard = (e) => {
    if (e.key === "Enter") handleSubmit();
  };


  return (
    <div className="container mt-5">
      <h1 className="text-light text-center">Welcome To OdinBook!</h1>
      <h3 className="text-light text-center mt-5">Sign Up!</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              type="text"
              className="form-control form-control-sm"
              id="firstname"
              required
              onChange={(e) => setFirstname(e.target.value)}
              onKeyDown={handleKeyboard}
            />
            <label htmlFor="firstname">First Name</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              type="text"
              className="form-control form-control-sm"
              id="lastname"
              required
              onChange={(e) => setLastname(e.target.value)}
              onKeyDown={handleKeyboard}
            />
            <label htmlFor="lastname">Last Name</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyboard}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              type="username"
              className="form-control form-control-sm"
              id="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyboard}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="mb-3 w-50 mx-auto form-floating">
            <input
              type="password"
              className="form-control form-control-sm"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyboard}
            />
            <label htmlFor="password">Password</label>
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

export default SignupForm;
