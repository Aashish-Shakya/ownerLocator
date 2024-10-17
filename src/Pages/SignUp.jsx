import React, { useEffect, useState } from 'react'
import { account, database } from '../appwrite/config'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useAuth } from '../Auth/useAuth';


export const SignUp = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoggedIn } = useAuth(); // Import the signup function from useAuth


  // Redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); // Redirect to home if logged in
    }
  }, [isLoggedIn, navigate]);


  const handlesubmit = async (e) => {
    e.preventDefault()
    console.log("Registered successfully")
    if (name === "" || email === "" || password === "") {
      alert('Please enter your details')
      return
    }
    try {
      await signup(email, password, name);
    } catch (err) {
      console.error('Error during sign-up:', err);
    }

  }





  return (
    <>

      {!isLoggedIn ? (

        <div className="font-montserrat rounded-[40px] border-2 border-purple-900 relative h-[450px] w-1/2 mt-20 mx-auto flex justify-end bg-white shadow-[0_5px_15px_0_rgba(0,0,0,0.35)]">
          {/* Sign Up Form */}
          <div className="rounded-[40px]  form-container sign-up w-1/2 h-full overflow-auto">

            <form className="p-2 bg-white flex flex-col items-center justify-center h-full" onSubmit={handlesubmit}>
              <h1 className="text-3xl font-bold mb-4">Create Account</h1>
              <div className="social-icons flex gap-4 mb-4">
                <a href="#" className="icon border border-[#ccc] rounded-lg p-3">
                  <FaGooglePlusG className="text-lg" />
                </a>
                <a href="#" className="icon border border-[#ccc] rounded-lg p-3">
                  <FaFacebookF className="text-lg" />
                </a>
                <a href="#" className="icon border border-[#ccc] rounded-lg p-3">
                  <FaGithub className="text-lg" />
                </a>
                <a href="#" className="icon border border-[#ccc] rounded-lg p-3">
                  <FaLinkedinIn className="text-lg" />
                </a>
              </div>
              <span className="text-xs mb-4">or use your email for registration</span>
              <input
                type="text"
                id="name"
                placeholder="Enter your Name"
                onChange={(e) => setName(e.target.value)}
                className="bg-[#eee] w-4/5 px-4 p-2  mb-3 text-xs rounded-lg"
              />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#eee] w-4/5 px-4 p-2 mb-3 text-xs rounded-lg"
              />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#eee] w-4/5 px-4 p-2 mb-3 text-xs rounded-lg"
              />
              <button className="bg-[#512da8] text-white py-2 px-10 rounded-lg uppercase font-semibold tracking-wider">
                Sign Up
              </button>
            </form>
          </div>

          {/* Right container */}
          <div className="rounded-[40px]  toggle-container absolute top-0 right-1/2 w-1/2 h-full overflow-hidden rounded-r-[100px]">
            <div className="bg-gradient-to-r from-custom-start to-custom-end  text-white h-full w-full 
flex justify-center ">
              <div className="toggle-panel absolute h-full flex flex-col items-center justify-center text-center  ">
                <h1 className="text-3xl font-bold ">Welcome Back !</h1>
                <p className="text-sm leading-5 tracking-[0.3px] my-5 w-4/5">Enter your personal details to use all site features</p>
                <NavLink to="/signin"   >
                  <button
                    className="text-xs bg-transparent border border-white text-white py-2 px-10 rounded-lg">
                    Sign In
                  </button>
                </NavLink>
              </div>
            </div>
          </div>


        </div>
      ) : (
        <h1>Redirecting...</h1> // Show this while redirecting
      )}
    </>



  );
};
