import  Post  from './Post'
import Navbar from "./Navbar"


function Home() {

    
    return (
        <main>
            <header>
            <Navbar />
            </header>
            <section>
                <div className="container-fluid">
                    <h1 className='text-light mb-5 text-center'>OdinBook</h1>
                    <p className='text-light mb-5 text-center'>Welcome to OdinBook!</p>
                </div>
            </section>
                    <h4 className='text-light text-center'>Your Posts</h4>
            <section className="row p-3 pt-1 w-100">
                    <Post />
            </section>
        </main>
    );
}

export default Home;