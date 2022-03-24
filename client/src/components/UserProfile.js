import '../App.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserIndex() {

  const { id } = useParams();

  useEffect(() => {
    fetchUser();
   }, []);

  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const data = await fetch(`api/users/${id}`)
    const user = await data.json();

    console.log(user.user)
    setUser(user.user)
  }

    return (
      <div>
        <h1 className='text-light'>Hello from {user.username}</h1>
      </div>
    
  );
}

export default UserIndex;