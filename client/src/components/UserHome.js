import  Post  from './Post'
import Navbar from "./Navbar"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {

    const userid = localStorage.getItem('userid')
    console.log(userid)
    
    const [user, setUser] = useState({});
    
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const data = await fetch(`/api/users/${userid}`)
        const user = await data.json();

        setUser(user.user)
        console.log(user.user)
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await fetch('api/users');
        const users = await data.json();
        
        setUsers(users.user_list)
    }
    
    const [users, setUsers] = useState([]);
    const filtered = users.filter(user => user._id !== userid)

    return (
        <main>
            <header>
                <Navbar />
            </header>
            <section>
                <div className="container-fluid">
                    <h1 className='text-light text-center'>OdinBook</h1>
                    <p className='text-light mb-5 text-center'>Welcome to OdinBook {user.firstname} !</p>
                    <p className='text-light'>{user.username}</p>
                    
                </div>
            </section>
            <div className='d-flex'>
            <div id='userSidebar' className='container-fluid w-50'>
                <h5 className='text-light' >Users</h5>
                {filtered.map(filter => (
                        <Link key={filter._id} className='p-3 nav-link bg-light w-75' to={`/${filter._id}`}>{filter.username}</Link>
                        ))}
            </div>
                <Post />
            </div>
       </main>
    );
}

export default Home;