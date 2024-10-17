import { useEffect, useState } from "react";
import { account, database } from "../appwrite/config";
import { useAuth } from '../Auth/useAuth'; // Adjust the path to your useAuth hook
import { useVehicle } from '../Auth/useVehicle'; // Adjust the path to your useAuth hook

export const VehicleDetails = () => {

    // State for tracking login status
    const { isLoggedIn, user } = useAuth();

    const [userid, setUserId] = useState(null);  // Ensure initial state is null
    // State for adding new car
    const [car, setCar] = useState('');

    const { getVehicleDetails, vehicles, addCar } = useVehicle();
    // Run on component mount to check if the user is logged in



    // Function to check if the user is logged in
    if (isLoggedIn) {
        getVehicleDetails(user?.$id);
    }
    // else {
    //     console.log("User not logged in:");
    // }

    // Function to Add new vehicle
    const handlesubmit = async (e) => {
        // e.preventDefault()
        console.log("Add vehicle successfully")

        if (car != null) {

            try {
                await addCar(user?.$id, car);
                setCar('')
            } catch (err) {
                console.error('Error during Adding Vehicle:', err);
            }
        } else {
            console.log("Enter something in Vechile number")
        }

    }




    return (
        <div className="font-montserrat mt-20">
            {isLoggedIn ? (
                <>
                    <div className="flex">
                        <div className="border-2 border-purple-900 mx-auto flex bg-white shadow-[0_5px_15px_0_rgba(0,0,0,0.35)] justify-center items-center w-[350px] p-4">
                            <div>
                                <label htmlFor="car">Vehicle Number: </label>
                                <input
                                    type="text"
                                    id="car"
                                    placeholder="Enter your vehicle number"
                                    onChange={(e) => setCar(e.target.value)}
                                    className="bg-[#eee] w-full px-4 p-2 mb-3 text-xs rounded-lg"
                                />

                                <h1>UserId: {user?.$id}</h1>

                                <div className="flex justify-center p-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handlesubmit}
                                    >
                                        Add Vehicle
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Display vehicles belonging to the logged-in user */}
                        <div className="vehicle-list mx-auto">
                            <h1>Your Vehicle Details</h1>
                            {vehicles.length > 0 ? (
                                vehicles.map((vehicle) => (
                                    <div
                                        key={vehicle.$id}
                                        className="border-2 border-purple-900 mx-auto flex bg-white shadow-[0_5px_15px_0_rgba(0,0,0,0.35)] justify-center items-center w-[350px] p-4 my-4"
                                    >
                                        <h1>Car Number: {vehicle.CarNumber}</h1>
                                    </div>
                                ))
                            ) : (
                                <p>No vehicles found</p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Loading screen while user status is being checked */}
                    <div className="flex justify-center items-center h-screen">
                        <button
                            type="button"
                            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center cursor-not-allowed"
                        >
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    ></path>
                                </svg>
                                Loading...
                            </>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
