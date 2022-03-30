import  Post  from './Post'
import Navbar from "./Navbar"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {

    const userid = localStorage.getItem('userid')
    const [user, setUser] = useState({});
    const [usersPosts, setUsersPosts] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const data = await fetch(`/api/users/${userid}`)
        const user = await data.json();
        setUser(user.user)
        setUsersPosts(user.users_posts)
        console.log(user.user)
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
        console.log(friends.data)
    }
    
    const filtered = users.filter(user => user._id !== userid)
    const filteredFriends = friends.filter(friend => friend.to._id === userid)
    console.log(filteredFriends)
    return (
        <main>
            <header>
                <Navbar />
            </header>
            <section>
                <div className="container-fluid">
                    <h1 className='text-light text-center'>OdinBook</h1>
                    <p className='text-light text-center'>Welcome to OdinBook, {user.username} !</p>
                    <p className='text-light'>{user.firstname} {user.lastname}</p>
                    <p className='text-light'>{user.username}</p>
                    <p className='text-light'>{user.email}</p>
                </div>
            </section>
            <div className='d-flex'>
            <div id='userSidebar' className='container-fluid w-50'>
                <h5 className='text-light' >Users</h5>
                {filtered.map(filter => (
                        <Link key={filter._id} className='p-3 nav-link bg-light w-75' userid={userid} to={`/${filter._id}`}>{filter.username}</Link>
                        ))}
            </div>
                <Post userid={userid} usersPosts={usersPosts} />
                <div id='friendSidebar' className='container-fluid w-50'>
                <h5 className='text-light'>Friend Requests</h5>
                {filteredFriends.map(filter => (
                        <Link key={filter._id} className='p-3 nav-link bg-light w-75' userid={userid} to={`/${filter.from._id}`}>{filter.from.firstname}</Link>
                        ))}
                </div>
                
            </div>
            
       </main>
    );
}

export default Home;