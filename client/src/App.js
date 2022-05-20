import "./App.css";
import UserHome from "./components/UserHome";
import SignupForm from "./components/SignupForm";
import Login from "./components/Login";
import ProfileForm from "./components/ProfileForm";
import UserProfile from "./components/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="bg-dark">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/updateProfile" element={<ProfileForm />} />
          <Route path="/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
