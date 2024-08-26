import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User successfully logged in");
      toast.success("Login successful! Welcome back.", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate('/form');
    } catch (error) {
      console.log(error.message);
      
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      
      const user = result.user;
      console.log("Google sign-in successful", user);
      toast.success("Google sign-in successful! Welcome back.", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate('/form');
    } catch (error) {
      console.log(error.message);
      toast.error("Google sign-in failed. Please try again later.", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#12172E] ">
      <div className=" w-[578px] h-[642px] bg-white rounded-lg">
        <div className="bg-[#95BDFF] max-h-[104px] p-0 rounded-t-lg ">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="logo.png" alt="Logo" className="h-114px w-99px" />
              <h1 className="text font-bold text-[#000000a8] pb-4" style={{ fontWeight: 700, fontSize: '20px', fontFamily: 'DM Sans'}}>Taskfy</h1>
            </div>
            <h2 className="font-bold text-[#000000a8] pb-4 pr-5" style={{ fontWeight: 700, fontSize: '20px',fontFamily: 'DM Sans' }}>Login</h2>
          </div>
        </div>

        <div className="bg-white p-8 rounded-b-lg shadow-lg h-[calc(100%-104px)] flex flex-col justify-between mt-[60px]">
          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-2 w-full max-w-[320px] mx-auto mb-[22px]">
              <label
                htmlFor="email"
                className="block font-medium text-[#605D5D] text-left" style={{fontSize: '12px' , fontFamily: 'DM Sans' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full h-[42px] px-[12px] border border-gray-300 rounded-[8px] shadow-sm focus:outline-none focus:ring-[#6FBCFF] focus:border-[#6FBCFF] sm:text-base "
              />
            </div>

            <div className="space-y-2 w-full max-w-[320px] mx-auto mt-[22px]">
              <label
                htmlFor="password"
                className="block font-medium text-[#605D5D] text-left "style={{fontSize: '12px', fontFamily: 'DM Sans' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full h-[42px] px-[12px] border border-gray-300 rounded-[8px] shadow-sm focus:outline-none focus:ring-[#6FBCFF] focus:border-[#6FBCFF] sm:text-base"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5">
                  <img src="eye.png" alt="Toggle Password Visibility" className="h-6 text-gray-400" />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-[320px] h-[34px] py-3 px-4 border border-transparent rounded-[8px]  text-white bg-[#95BDFF] hover:bg-[#6FBCFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A1CBFF] flex items-center justify-center mx-auto mb-[26px]"style={{fontSize: '14px' , fontFamily: 'DM Sans' }}
            >
              Login
            </button>

            <div className="text-center text-sm pb-6">
              <div className="relative flex justify-center ">
                <hr className="w-full max-w-[360px] border-t" style={{ color: '#9190AE' }} />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-2 " style={{fontSize: '14px' ,color: '#000000' }}>OR</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center mt-[46px]">
              <button
                onClick={handleGoogleSignIn}
                className="w-[320px] h-[40px] py-[9.5px] px-4 border border-gray-300 rounded-[12px] shadow-sm bg-[#F2F2F8]    flex items-center justify-center"style={{fontSize: '14px',fontStyle:'' ,color: '#000000' }}
              >
                <img
                  src="google.png"
                  alt="Google Logo"
                  className="w-6 h-6 mr-2"
                />
                Log in with Google
              </button>

              <div className="mt-[5px] flex w-full max-w-[320px] justify-between">
                <a href="#" className="text-[#1C64F2] hover:underline" style={{ fontSize: '8px', fontWeight: 400, lineHeight: '21px', textAlign: 'left' }}>
                  Log in to another account
                </a>
                <a href="#" className="text-[#1C64F2] hover:underline" style={{ fontSize: '8px', fontWeight: 400, lineHeight: '21px', textAlign: 'right' }}>
                  Need a login link?
                </a>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
