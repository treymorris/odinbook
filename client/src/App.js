import './App.css';


import UserHome from './components/UserHome';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import ProfileForm from './components/ProfileForm';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile'
import PostForm from './components/PostForm'
import CommentForm from './components/CommentForm'
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
          <Route path='/:id' element={<UserProfile />} />
          <Route path='/create' element={<PostForm />} />
          <Route path='/CommentForm' element={<CommentForm/>} />
        </Routes>
      </Router>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
