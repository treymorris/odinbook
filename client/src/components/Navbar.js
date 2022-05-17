import { NavLink } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
          <NavLink className="p-3 nav-link" to="/userHome">
            Odinbook
          </NavLink>
        <div className="nav ">
          <NavLink className="p-3 nav-link" to="/userIndex">
            Find User
          </NavLink>
          {/* <NavLink className="p-3 nav-link" to="/create">
            Create Post
          </NavLink> */}
          <NavLink className="p-3 nav-link" to="/" onClick={logout}>
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
