import { useEffect, useState } from "react";
// import { account } from "../appwrite/config";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Auth/useAuth";
import car from '../assets/car.jpg'
import banner from '../assets/banner.png'


export const Home = () => {

    // const { isLoggedIn, user } = useAuth();


    // const navigate = useNavigate()




    return (
        <>
 
            {/* {isLoggedIn ? <> */}

                <div className="relative h-5">
                    {/* Marquee container */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl overflow-hidden">
                        {/* Moving content */}
                        <div className="animate-marquee-ping-pong whitespace-nowrap">
                            <h1 className="text-center text-4xl font-bold text-indigo-600">
                                {/* Hello {user?.name}, Welcome */}
                            </h1>
                        </div>
                    </div>
                </div>
            {/* </> : <><h1>...</h1></>} */}

            <div>

                <section id="hero" className="text-center bg-cover bg-center bg-hero-image text-black flex">
                    <div className="w-1/2 p-32 ">
                        <h1 className="font-montserrat text-5xl font-bold leading-[5rem]  ">Locate Any Vehicle </h1>
                        <h2 className="font-montserrat text-3xl font-bold leading-[5rem]">Owner Instantly with </h2>
                        <h1 className="font-montserrat text-5xl font-bold leading-[5rem]">QR Codes</h1>
                        <p className="my-5 leading-[2rem]">Effortlessly find your vehicle in crowded areas with our innovative QR code technology.</p>
                        <a href="#get-started" className="px-5 py-3 bg-orange-500 text-white rounded-md ">Get Started</a>
                    </div>
                    <div className='w-1/2 '>
                        <img src={banner} alt="" className='w-full' />
                    </div>


                </section>

                <section id="how-it-works" className="py-20 text-center m-3">
                    <h2 className="text-3xl font-bold mb-10">How It Works</h2>
                    <div className="flex justify-around gap-10">
                        <div className="w-1/3">
                            <img
                                src={car}
                                alt="Scan QR Code"
                                className="border-2 border-yellow-400 w-full h-80% shadow-2xl rounded-3xl"
                            />
                            <h3 className="text-xl font-semibold mt-5">Scan the QR Code</h3>
                            <p>Use your smartphone to scan the QR code on your vehicle.</p>
                        </div>
                        <div className="w-1/3">
                            <img src={banner} alt="" className="border-2 border-yellow-400 w-full  h-80 shadow-2xl rounded-3xl" />
                            <h3 className="text-xl font-semibold mt-5">Locate Your Vehicle</h3>
                            <p>Get the exact location of your vehicle on the map.</p>
                        </div>
                        <div className="w-1/3">
                            <img src={car} alt="" className="border-2 border-yellow-400 w-full h-auto shadow-2xl rounded-3xl" />
                            <h3 className="text-xl font-semibold mt-5">Reach Your Destination</h3>
                            <p>Follow the directions to find your vehicle quickly.</p>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-20 text-center">
                    <h2 className="text-3xl font-bold mb-10">Features</h2>
                    <div className="mb-5">
                        <h3 className="text-xl font-semibold">Real-Time Tracking</h3>
                        <p>Track your vehicle's location in real-time.</p>
                    </div>
                    <div className="mb-5">
                        <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
                        <p>Easy to use and navigate.</p>
                    </div>
                    <div className="mb-5">
                        <h3 className="text-xl font-semibold">Secure and Reliable</h3>
                        <p>Your data is safe with us.</p>
                    </div>
                </section>

                <section id="testimonials" className="py-20 text-center">
                    <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
                    <div className="mb-5">
                        <p>"This service is a lifesaver! I can always find my car now."</p>
                        <p>- Happy Customer</p>
                    </div>
                    <div className="mb-5">
                        <p>"Super easy to use and very reliable."</p>
                        <p>- Satisfied User</p>
                    </div>
                </section>

                <section id="pricing" className="py-20 text-center ">
                    <h2 className="text-3xl font-bold mb-10">Pricing</h2>
                    <div className="inline-block p-5 border border-gray-300 m-5 w-1/3">
                        <h3 className="text-xl font-semibold">Basic</h3>
                        <p>$9.99/month</p>
                        <a href="#choose-plan" className="block mt-5 px-5 py-3 bg-orange-500 text-white rounded-md">Choose Plan</a>
                    </div>
                    <div className="w-1/3 inline-block p-5 border border-gray-300 m-5">
                        <h3 className="text-xl font-semibold">Premium</h3>
                        <p>$19.99/month</p>
                        <a href="#choose-plan" className="block mt-5 px-5 py-3 bg-orange-500 text-white rounded-md">Choose Plan</a>
                    </div>
                    <div className="w-1/3 inline-block p-5 border border-gray-300 m-5">
                        <h3 className="text-xl font-semibold">Enterprise</h3>
                        <p>Contact Us</p>
                        <a href="#choose-plan" className="block mt-5 px-5 py-3 bg-orange-500 text-white rounded-md">Choose Plan</a>
                    </div>
                </section>

                <footer className="bg-gray-800 text-white py-5 text-center">
                    <div className="mb-5">
                        <a href="#privacy-policy" className="text-white mx-2">Privacy Policy</a>
                        <a href="#terms-of-service" className="text-white mx-2">Terms of Service</a>
                        <a href="#faq" className="text-white mx-2">FAQ</a>
                        <a href="#support" className="text-white mx-2">Support</a>
                    </div>
                    <div className="mb-5">
                        <a href="#facebook" className="text-white mx-2">Facebook</a>
                        <a href="#twitter" className="text-white mx-2">Twitter</a>
                        <a href="#linkedin" className="text-white mx-2">LinkedIn</a>
                    </div>
                    <div className="mb-5">
                        <p>Email: support@locateyourvehicle.com</p>
                        <p>Phone: +1 234 567 890</p>
                    </div>
                </footer>
            </div>


        </>
    );
};

