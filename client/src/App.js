import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import LoginPage from './Components/auth/loginPage';
import SignUpPage from './Components/auth/SignUpPage';
import CreateTask from './Components/tasks/taskForm';
import Home from './Components/tasks/Home';
import { useEffect, useState } from 'react';
import { auth } from './Components/firebase/firebase';


function App() {
  const [user,setUser] = useState()

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
        setUser(user)
    })
  })
  return (
    <Router>
      <div className='App'>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Routes>
              <Route path="/" element={<LoginPage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/signup" element={<SignUpPage/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/form" element={<CreateTask/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
