import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../appwrite/config';
import { Query } from 'appwrite';
// import { Loading } from '../components/Loading'


export const Redirect = () => {
    const { link } = useParams(); // Get the dynamic link from the URL
    const [linkDetails, setLinkDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(3); // Set countdown to 3 seconds

    useEffect(() => {
        const fetchLinkDetails = async () => {
            try {
                const response = await database.listDocuments(
                    '66e423730021a0910a61', // Database ID
                    '66ebacba0032bba8da0d', // Collection ID
                    [Query.equal('QrText', link)] // Fetch document where 'link' matches the dynamic URL parameter
                );

                if (response.documents.length > 0) {
                    setLinkDetails(response.documents[0]); // Set the first matching document
                    startTimer(response.documents[0].Link); // Start the countdown timer with the link
                } else {
                    console.log('No details found for this link');
                }
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false); // Ensure loading state is updated
            }
        };

        fetchLinkDetails();
    }, [link]);

    const startTimer = (redirectText) => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === 1) {
                    clearInterval(timer);
                    window.location.href = redirectText; // Redirect when countdown reaches zero
                    return 0; // Stop countdown at zero
                }
                return prevCount - 1; // Decrease count
            });
        }, 1000); // Update every second
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!linkDetails) {
        return <div>No details found for this link.</div>; // Handle case where no details are found
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                {/* <h2 className="text-2xl font-semibold mb-4">Link Details</h2>
        <p className="text-gray-700">User ID: {linkDetails.UserId}</p>
        <p className="text-gray-700">Link: {linkDetails.Link}</p> Safely access Link property */}
                {/* <Loading /> */}
                <h1>Loading</h1>
                <h1 className="mt-4 text-xl font-bold">{count > 0 ? `Redirecting in ${count}...` : 'Redirecting...'}</h1>
            </div>
        </div>
    );
};

export default Redirect;
