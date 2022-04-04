import '../App.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar"
const { DateTime } = require('luxon');

function UserIndex() {

  const { id } = useParams();

  useEffect(() => {
      fetchUser();
   }, []);

  const userid = localStorage.getItem('userid')
   
  const fetchUser = async () => {
    const data = await fetch(`api/users/${id}`)
    const user = await data.json();

    console.log(user.user)
    setUser(user.user)
  };

  const [user, setUser] = useState({});

  const handleClick = () => {
    
    fetch('/api/friends/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        from: userid,
        to: id,
        
      })
    })
  }

  const userImage = user.profile_pic ? user.profile_pic : 'https://via.placeholder.com/150'

  return (
      
    <div>
      <Navbar />
      <h1 className='text-light text-center mt-5 mb-5'>User Profile: {user.username}</h1>
      <div className='d-flex'>
      <img src={userImage} alt=''></img>
        <div >
          <p className='text-light mt-1 p-1 mb-1 ms-5'>{user.firstname} {user.lastname}</p>
          <p className='text-light p-1 mb-1 ms-5'>{user.email}</p>
          <p className='text-light p-1 mb-1 ms-5'>Birthday: {DateTime.fromISO(user.birth_date).toLocaleString(DateTime.DATE_MED)}</p>
          <p className='text-light p-1 mb-1 ms-5'>Hobbies: {user.hobbies}</p>
          <p className='text-light p-1 mb-1 ms-5'>{user.bio}</p>
        </div>
      </div>
      <button className='btn nav-link ps-0 mt-3 mb-5' onClick={handleClick}>Send Friend Request</button>
      </div>
    
  );
}

export default UserIndex;