import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = () => {
    //e.preventDefault();

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json()) //catch token here and save to local storage
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userid", data.userid);
          navigate("/userHome");
        } else if (data.error) {
          console.log(data.error);
          data.error.forEach((error)=> {alert(error.msg)})
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyboard = (e) => {
    if (e.key === 'Enter') handleSubmit();
  }

  const handleNewAccount = () => {
    navigate("/signup");
  };

  const handleFacebook = () => {};

  const handleGoogle = () => {};

  return (
    <div className="container">
      <h1 className="text-light text-center mb-5 mt-5">OdinBook</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 w-50 mx-auto form-floating">
            <input
              type="username"
              className="form-control form-control-sm"
              id="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyboard}
            />
            <label htmlFor="firstname">Username</label>
          </div>
          <div className="mb-2 w-50 mx-auto form-floating">
            <input
              type="password"
              className="form-control form-control-sm"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyboard}
            />
            <label htmlFor="firstname">Password</label>
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
          >
            Log In
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleNewAccount}
          >
            Create New Account
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleFacebook}
          >
            Log In with Facebook
          </button>
          <button
            className="btn btn-primary mb-5"
            type="button"
            onClick={handleGoogle}
          >
            Log In with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
