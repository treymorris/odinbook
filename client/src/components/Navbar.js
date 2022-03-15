import { NavLink } from 'react-router-dom';



function Navbar() {

    const logout = (e) => {
        localStorage.removeItem('user');
    };


  return (
      <nav className='navbar justify-content-center mt-3 mb-5'>
          <div className='container-fluid'>
              <div className='nav justify-content-end'>
                    <NavLink className='p-3' to='/userHome'>Home</NavLink>
                    <NavLink className='p-3' to='/userIndex' >Find User</NavLink>
                    <NavLink className='p-3' to='/updateProfile' >Update Profile</NavLink>
                    <NavLink className='p-3' to='/create' >Create Post</NavLink>
                    <NavLink className='p-3' to='/' onClick={logout} >Logout</NavLink>
                </div>
          </div>
      </nav>
  );
}

export default Navbar;