import { useState, useEffect } from 'react';
import { account, database } from '../appwrite/config'
import { useNavigate } from 'react-router-dom';
import { Query } from 'appwrite';

import { useAuth } from '../Auth/useAuth'; // Adjust the path to your useAuth hook


export const useVehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const {user} = useAuth();
 

    // Function to get vehicle details specific to the logged-in user
    const getVehicleDetails = async (userId) => {
        try {
            // Fetch documents from the collection specific to the logged-in user using Query.equal
            const response = await database.listDocuments(
                '66e423730021a0910a61',  // Database ID
                '66ea51e4001034bcbe02',  // Collection ID
                [Query.equal('UserId', userId)]  // Fetch only documents where 'UserId' matches the logged-in user's ID
            );

            // Ensure only user-specific vehicles are set
            setVehicles(response.documents);
            // console.log(response.documents);  // This will log all documents in the collection for the logged-in user
        } catch (e) {
            console.error('Error fetching vehicle details:', e.message);
        }
    };

    
    const addCar = async (userId, car) => {
       
        try {
            await database.createDocument(
                '66e423730021a0910a61',
                '66ea51e4001034bcbe02',
                'unique()',
                {
                    UserId: userId,  // Ensure the correct UserId is saved
                    CarNumber: car,  // Car number being added
                }
            );
            // console.log("Car added successfully");
            // getVehicleDetails(userId);  // Refresh the list after adding a new car
        } catch (e) {
            console.log("Error adding car:", e.message);
        }
    };

    return {getVehicleDetails, vehicles, addCar };
};