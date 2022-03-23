import { NavLink } from 'react-router-dom';



function Navbar() {

    const logout = () => {
        localStorage.removeItem('user');
    };


  return (
      <nav className='navbar mt-3 mb-3'>
          <div className='container-fluid'>
              <div className='nav mx-auto'>
                    <NavLink className='p-3 nav-link' to='/userHome'>Home</NavLink>
                    <NavLink className='p-3 nav-link' to='/userIndex' >Find User</NavLink>
                    <NavLink className='p-3 nav-link' to='/updateProfile' >Create Profile</NavLink>
                    <NavLink className='p-3 nav-link' to='/create' >Create Post</NavLink>
                    <NavLink className='p-3 nav-link' to='/' onClick={logout} >Logout</NavLink>
                </div>
          </div>
      </nav>
  );
}

export default Navbar;