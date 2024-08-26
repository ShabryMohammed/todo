import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link , useNavigate} from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please make sure both passwords are the same.", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");
      toast.success("Registration successful! Welcome to Taskfy.", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate('/home');
    } catch (error) {
      console.log(error.message);
      toast.error(`Registration failed: ${error.message}`, {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info
      const user = result.user;
      console.log("Google sign-up successful", user);
      toast.success("Google sign-up successful! Welcome to Taskfy.", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Google sign-up failed. Please try again later.", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#12172E]">
      <div className="w-full max-w-lg">
        <div className="bg-[#95BDFF] p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="logo.png" alt="Logo" className="h-14 mr-2" />
              <h1 className="text-2xl font-bold text-[#000000a8]">Taskfy</h1>
            </div>
            <h2 className="text-xl font-bold text-[#000000a8]">Sign Up</h2>
          </div>
        </div>

        <div className="bg-white p-10 rounded-b-lg shadow-lg">
          <form className="space-y-8" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: '10px' }}
                className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6FBCFF] focus:border-[#6FBCFF] sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Password
              </label>
              <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: '10px' }}
                className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6FBCFF] focus:border-[#6FBCFF] sm:text-base"
              />
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5">
                  <img src="eye.png" alt="Toggle Password Visibility" className="h-6 text-gray-400" />
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 text-left"
              >
                Confirm Password
              </label>
              <div className="relative">
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ borderRadius: '10px' }}
                className="block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#6FBCFF] focus:border-[#6FBCFF] sm:text-base"
              />
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5">
                  <img src="eye.png" alt="Toggle Password Visibility" className="h-6 text-gray-400" />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#95BDFF] hover:bg-[#6FBCFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A1CBFF]"
            >
              Sign Up
            </button>
          </form>

          <div className="my-6 text-center text-sm text-gray-500">
            <div className="relative">
              <span className="absolute inset-0 flex items-center">
                <hr className="w-full border-gray-300" />
              </span>
              <span className="relative bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            style={{ borderRadius: '10px' }}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-[#F2F2F8] hover:bg-[#E2E2E8] text-base font-medium text-gray-700"
          >
            <img
              src="google.png"
              alt="Google Logo"
              className="w-6 h-6 mr-2"
            />
            Sign up with Google
          </button>

          <div className="mt-8 text-center text-xs">
            <Link to="/login" className="text-sm text-[#1C64F2] hover:underline">Already have an account? Login</Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignupPage;
