import { Link, NavLink } from "react-router-dom";
import {  useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
 
// import { useAuth } from "../Auth/useAuth";

export const Navbar = () => {
    // const {isLoggedIn, user, logout} = useAuth();

    const [click, setClick] = useState(false);


    const handleClick = () => {
        setClick(!click);
    }
    const content = <>
        <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
            <ul className="text-center text-xl p-20">
                <Link spy={true} smooth={true} to='/'><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Home</li></Link>
                <Link spy={true} smooth={true} to='SignIn'><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">SignIn</li></Link>
                <Link spy={true} smooth={true} to='SignUp'><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">SingUp</li></Link>
                <Link spy={true} smooth={true} to='About'><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">About</li></Link>

            </ul>

        </div>
    </>
    return (

        <nav className="bg-slate-900">

            <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1">
                <div className="flex items-center flex-1">
                    <span className="text-3xl font-bold">Logo</span>
                </div>

                <div className="lg:flex md:flex-1 items-center justify-end font-normal hidden">
                    <div className="flex-10" >
                        <ul className="flex gap-8 mr-16 text-[18px] ">
                            <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                <NavLink to="/"   > Home </NavLink>
                            </li>
                            <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                <NavLink to="/about"  > About </NavLink>
                            </li>
                            <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                <NavLink to="/qr"  > Qr </NavLink>
                            </li>
                            <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                <NavLink to="/contactOwner"  > CO </NavLink>
                            </li>
                            <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                <NavLink to="/vehicledetails"  >VehicleDetails </NavLink>
                            </li>
                            {/* {isLoggedIn ? ( */}
                                <>
                                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">

                                        <button className="logout-button"  >  Logout </button>
                                    </li>

                                    <p className="bg-white text-gray-600">Hello                               
                                    </p>
                                </>
                            {/* ):( */}
                                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                                    <NavLink to="/signin"  > Login </NavLink>
                                </li>
                                {/* )} */}




                        </ul>
                    </div>
                </div>

                <div>
                    {click && content}
                </div>
                <button className="block sm:hidden transition" onClick={handleClick}>
                    {click ? <FaTimes /> : <CiMenuFries />}
                </button>
            </div>
        </nav>


    );
};


{/* <nav>
                    <ul className="flex gap-5">
                        <li><a href="#home" className="text-white">Home</a></li>
                        <li><a href="#how-it-works" className="text-white">How It Works</a></li>
                        <li><a href="#features" className="text-white">Features</a></li>
                        <li><a href="#pricing" className="text-white">Pricing</a></li>
                        <li><a href="#contact" className="text-white">Contact Us</a></li>
                        <li><a href="#login" className="text-white">Login/Sign Up</a></li>
                    </ul>
                </nav> */}