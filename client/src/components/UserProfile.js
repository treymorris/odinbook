import '../App.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function UserIndex() {

  const { id } = useParams();

  useEffect(() => {
      fetchUser();
   }, []);

  

  const fetchUser = async () => {
    const data = await fetch(`api/users/${id}`)
    const user = await data.json();

    console.log(user.user)
    setUser(user.user)
  };

  const [user, setUser] = useState({});

  const handleClick = () => {
    
    fetch('/api/friends/request')
  }

  return (
      
      <div>
      <h1 className='text-light text-center'>{user.username}</h1>
      <p className='text-light'>{user.firstname} {user.lastname}</p>
      <p className='text-light'>{user.email}</p>
      <button className='btn nav-link' onClick={handleClick()}>Click to Send Friend Request</button>
      </div>
    
  );
}

export default UserIndex;