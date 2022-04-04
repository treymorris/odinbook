import  Post  from './Post'
import Navbar from "./Navbar"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const { DateTime } = require('luxon');




function Home() {

    const handleAccept = (friend) => {
    
        fetch('/api/friends/accept', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            id: friend
          })
        })
    }
    const handleDecline = (friend) => {
    
        fetch('/api/friends/decline', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            id: friend
          })
        })
    }

    const userid = localStorage.getItem('userid')
    const [user, setUser] = useState({});
    const [usersPosts, setUsersPosts] = useState([]);
    const userImage = user.profile_pic ? user.profile_pic : 'https://via.placeholder.com/150'

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const data = await fetch(`/api/users/${userid}`)
        const user = await data.json();
        setUser(user.user)
        setUsersPosts(user.users_posts)
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await fetch('api/users');
        const users = await data.json();
        setUsers(users.user_list)
    };

    const [friends, setFriends] = useState([]);
    
    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        const data = await fetch('api/friends/pending');
        const friends = await data.json();
        setFriends(friends.data)
    };
    
    const filtered = users.filter(user => user._id !== userid)
    const filteredFriends = friends.filter(friend => friend.to._id === userid)
    
    return (
        <main>
            <header>
                <Navbar />
            </header>
            <section>
                <div className="container-fluid">
                    <h1 className='text-light text-center'>OdinBook</h1>
                    <p className='text-light text-center'>Welcome to OdinBook, {user.username} !</p>
                    <div className='d-flex mb-4'>
                        <img src={userImage} alt='user profile'></img>
                        <div>
                            <p className='text-light p-1 mb-0 ms-1'>{user.firstname} {user.lastname}</p>
                            <p className='text-light p-1 mb-0 ms-1'>{user.username}</p>
                            <p className='text-light p-1 mb-0 ms-1'>{user.email}</p>
                            <p className='text-light p-1 mb-0 ms-1'>Birthday: {DateTime.fromISO(user.birth_date).toLocaleString(DateTime.DATE_MED)}</p>
                            <p className='text-light p-1 mb-0 ms-1'>{user.bio}</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className='d-flex'>
                <div id='user-sidebar' className='container-fluid w-50'>
                    <h5 className='text-light' >Users</h5>
                    {filtered.map(filter => (
                        <Link
                            key={filter._id}
                            className='p-3 nav-link bg-light w-100 border border-primary'
                            userid={userid}
                            to={`/${filter._id}`}
                        >
                            {filter.username}
                        </Link>
                            ))}
                </div>
                <Post
                    userid={userid}
                    usersPosts={usersPosts}
                />
                <div id='friend-sidebar' className='container-fluid w-50'>
                    <h5 className='text-light'>Friends</h5>
                </div>
                <div id='friend-sidebar' className='container-fluid w-50'>
                    <h5 className='text-light'>Friend Requests</h5>
                        {filteredFriends.map(friend => (
                        <div key={friend._id} className='border border-primary'>
                        <Link
                            className='p-3 nav-link bg-light w-100'
                            to={`/${friend.from._id}`}
                        >
                            {friend.from.username}
                        </Link>
                        <button  className='btn btn-outline-primary w-50' onClick={() => handleAccept(friend._id)}>Accept</button>
                        <button  className='btn btn-outline-primary w-50' onClick={() => handleDecline(friend._id)}>Decline</button>    
                        </div>
                            ))}
                </div>
            </div>
        </main>
    );
}

export default Home;