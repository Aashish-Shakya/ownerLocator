import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from '../Auth/useAuth'; // Adjust the path to your useAuth hook

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoggedIn } = useAuth(); // Get the login function from useAuth
    const navigate = useNavigate();

    // Redirect if user is already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/'); // Redirect to home if logged in
        }
    }, [isLoggedIn, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Please enter credentials");
        } else {
            try {
                await login(email, password);
                navigate("/"); // Redirect after successful login
            } catch (error) {
                console.error("Login failed:", error);
            }
        }
    };

    return (
        <>
            {!isLoggedIn ? (
                <div className="font-montserrat rounded-[40px] border-2 border-purple-900 relative h-[450px] w-1/2 mt-20 mx-auto flex bg-white shadow-[0_5px_15px_0_rgba(0,0,0,0.35)]">
                    {/* Sign In Form */}
                    <div className="rounded-[40px] form-container sign-in w-1/2 h-full overflow-auto">
                        <form className="p-2 bg-white flex flex-col items-center justify-center h-full" onSubmit={handleSubmit}>
                            <h1 className="text-3xl font-bold mb-4">Sign In</h1>
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
                            <span className="text-xs mb-4">or use your email password</span>
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
                            <a href="#" className="text-xs mb-3">Forgot Your Password?</a>
                            <button type="submit" className="bg-[#512da8] text-white py-2 px-10 rounded-lg uppercase font-semibold tracking-wider">
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Toggle Panel */}
                    <div className="rounded-[100px] toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden rounded-r-[40px]">
                        <div className="bg-[#512da8] text-white h-full w-full flex justify-center">
                            <div className="toggle-panel absolute h-full flex flex-col items-center justify-center text-center">
                                <h1 className="text-3xl font-bold">Hello, Friend!</h1>
                                <p className="text-sm leading-5 tracking-[0.3px] my-5 w-4/5">Register with your personal details to use all site features</p>
                                <NavLink to="/signup">
                                    <button className="text-xs bg-transparent border border-white text-white py-2 px-10 rounded-lg">
                                        Sign Up
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
