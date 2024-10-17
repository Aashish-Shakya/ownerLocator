import React, { useEffect, useState } from 'react';
import { database } from '../appwrite/config';
import { Query } from 'appwrite';
import { useAuth } from '../Auth/useAuth';
import { useVehicle } from '../Auth/useVehicle';
// import { Loading } from '../components/Loading';

export const Details = () => {
  const [linkDetails, setLinkDetails] = useState([]);
  // const [vehicles, setVehicles] = useState([]); // Local state for vehicles
  const [loading, setLoading] = useState(true); // Single loading state for whole page
  const { user } = useAuth();
  const { getVehicleDetails, vehicles } = useVehicle(); // Remove vehicles from useVehicle

  // Fetch both link details and vehicle details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (user?.$id) {
          // Fetch user-specific link details
          const linkResponse = await database.listDocuments(
            '66e423730021a0910a61', // Database ID
            '66ebacba0032bba8da0d', // Collection ID
            [Query.equal('UserId', user.$id)] // Fetch documents for the current user
          );

          // Set link details if available
          if (linkResponse.documents.length > 0) {
            setLinkDetails(linkResponse.documents);
          }

          // Fetch vehicle details
          await getVehicleDetails(user.$id);

          setLoading(false); // Set loading to false after fetching both
        }
      } catch (error) {
        console.error('Error fetching details:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchDetails();
  }, [user, getVehicleDetails]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* < Loading /> */}
      <h1>Loading</h1> </div>; // Show the single loading spinner for whole page
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-4">Details Page</h1>

        {/* User Details */}
        <div className='mb-4'>
          <h1 className="text-xl font-semibold mb-4">User Detail</h1>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>UserId: {user?.$id}</p>
        </div>


        {/* Link Details */}
        <div className='mb-4'>
          <h1 className="text-xl font-semibold mb-4">Link Detail</h1>
          {linkDetails.length > 0 ? (
            linkDetails.map((links) => (
              <div key={links.$id}>
                <p className="text-gray-700">Link: {links.Link}</p>
                <p className="text-gray-700">Text: {links.QrText}</p>
              </div>
            ))
          ) : (
            <p>No link details found for this user.</p> // Show "No data" if no links found
          )}
        </div>

        {/* Vehicle Details */}
        <div>
          <h1 className="text-xl font-semibold mb-4">Car Detail</h1>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <div key={vehicle.$id}>
                <p className="text-gray-700">UserId: {vehicle.UserId}</p>
                <p className="text-gray-700">Number: {vehicle.CarNumber}</p>
              </div>
            ))
          ) : (
            <p>No car details found for this user.</p> // Show "No data" if no vehicles found
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
