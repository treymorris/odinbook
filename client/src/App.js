import './App.css';


import UserHome from './components/UserHome';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import ProfileForm from './components/ProfileForm';
import Footer from './components/Footer';
import UserIndex from './components/UserIndex'
import PostForm from './components/PostForm'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div>
      <Router>
      
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/userHome' element={<UserHome />} />
          <Route path='/updateProfile' element={<ProfileForm />} />
          <Route path='/userIndex' element={<UserIndex />} />
          <Route path='/create' element={<PostForm />} />
        </Routes>
      </Router>
      <footer className='fixed-bottom'>
        <Footer />
      </footer>
      
    </div>
  );
}

export default App;
