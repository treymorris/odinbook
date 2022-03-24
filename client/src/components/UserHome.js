import  Post  from './Post'
import Navbar from "./Navbar"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await fetch('api/users');
        const users = await data.json();

        setUsers(users.user_list)
    }

    const [users, setUsers] = useState([]);
    
    return (
        <main>
            <header>
                <Navbar />
            </header>
            <section>
                <div className="container-fluid">
                    <h1 className='text-light text-center'>OdinBook</h1>
                    <p className='text-light mb-5 text-center'>Welcome to OdinBook!</p>
                </div>
            </section>
            <div className='d-flex'>
            <div id='userSidebar' className='container-fluid w-50'>
                <h5 className='text-light' >Users</h5>
                {users.map(user => (
                        <Link key={user._id} className='p-3 nav-link bg-light w-75' to={`/${user._id}`}>{user.username}</Link>
                        ))}
            </div>
                <Post />
            </div>
       </main>
    );
}

export default Home;