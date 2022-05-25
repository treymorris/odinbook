import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";


function Navbar() {

   
  const logout = async () => {
    try {
      const response = await fetch("api/users/logout", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      localStorage.removeItem("userid");
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar sticky-top bg-secondary border-bottom border-primary border-1 mb-3">
      <div className="container-fluid">
        <NavLink className="p-3 nav-link display-6" to="/userHome">
          Odinbook
        </NavLink>
        <div className="nav ">
          <NavLink className="p-3 nav-link" to="/" onClick={logout}>
            <FontAwesomeIcon icon={faCircleUser} size="2x" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
