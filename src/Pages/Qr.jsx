import React, { useEffect, useState } from "react";
import { useAuth } from '../Auth/useAuth';
// import { Loading } from '../components/Loading';
import { useQr } from '../Auth/useQr';

export const Qr = () => {
  const { isLoggedIn, user } = useAuth();
  const { storeRandomString, getLinks, qrText, generateQR, deleteQR, qrImages, updateLink } = useQr();
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState({}); // Track editing state for each link
  const [updatedLinks, setUpdatedLinks] = useState({}); // Store updated values

  useEffect(() => {
    if (isLoggedIn && user?.$id) {
      // Fetch stored links when the user is logged in
      getLinks(user.$id);
    }
  }, [isLoggedIn, user, getLinks]);

  const handleGenerateString = async (e) => {
    e.preventDefault();
    try {
      // Generate and Store Random Text
      await storeRandomString(user?.$id);
      // Refresh to get stored links
      await getLinks(user?.$id);
    } catch (err) {
      console.error('Error during Adding String:', err);
    }
  };

  const handleInputChange = (id, newValue) => {
    // Update local state with new input value for each link
    setUpdatedLinks((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleEditToggle = (id, currentLink) => {
    // Toggle the edit state for the specific link and set initial value
    setIsEditing((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!isEditing[id]) {
      setUpdatedLinks((prev) => ({ ...prev, [id]: currentLink }));
    }
  };

  const handleSave = async (id) => {
    try {
      // Update link in the database
      await updateLink(id, updatedLinks[id]);
      // Refresh to get stored links after updating
      await getLinks(user?.$id);
    } catch (err) {
      console.error('Error updating link:', err);
    } finally {
      // Exit edit mode
      setIsEditing((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="m-8 flex flex-col justify-center items-center border-2 border-yellow-500">
      {isLoggedIn ? (
        <>
          <h1>Welcome, {user?.name}</h1>
          <div className="mt-10 mx-auto flex justify-center w-1/2">
            <button
              className="w-1/2 bg-[#512da8] text-white py-2 px-10 rounded-lg uppercase font-semibold tracking-wider"
              onClick={handleGenerateString}
            >
              Generate and Store Random String
            </button>
          </div>

          <div className="flex flex-col justify-center items-center m-2">
            <h1>Links Details</h1>
            <div className="flex flex-row flex-wrap">
              {qrText.length > 0 ? (
                qrText.map((links) => (
                  <div
                    key={links.$id}
                    className="border-2 border-purple-900 flex flex-col bg-white shadow-[0_5px_15px_0_rgba(0,0,0,0.35)] justify-center items-center w-[350px] p-4 m-4"
                  >
                    <div className="m-2">
                      <input
                        type="text"
                        placeholder="Text/Url"
                        value={links.QrText}
                        readOnly
                        className="w-full h-12 border border-indigo-500 outline-none p-2 mb-4 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Edit Link"
                        value={isEditing[links.$id] ? updatedLinks[links.$id] : links.Link}
                        onChange={(e) => handleInputChange(links.$id, e.target.value)}
                        className={`w-full h-12 border ${error ? 'border-red-500' : 'border-indigo-500'} outline-none p-2 mb-4 rounded-md`}
                        readOnly={!isEditing[links.$id]} // Editable only in edit mode
                      />

                      {/* Display QR Code if available */}
                      {links.$id in qrImages && (
                        <div className="max-h-[300px] mt-4">
                          <img src={qrImages[links.$id]} alt="QR Code" className="w-[200px] mx-auto border rounded-md p-2" />
                        </div>
                      )}

                      {/* Generate QR Button */}
                      <button
                        onClick={() => generateQR(links.QrText, links.$id)} // Call generateQR here
                        className="w-full h-12 bg-indigo-500 text-white font-semibold rounded-md shadow-lg mt-4 hover:bg-indigo-600 transition duration-300"
                      >
                        Generate QR
                      </button>

                      {/* Edit/Save Button */}
                      <button
                        onClick={() => {
                          if (isEditing[links.$id]) {
                            handleSave(links.$id); // Save changes when in edit mode
                          } else {
                            handleEditToggle(links.$id, links.Link); // Enter edit mode
                          }
                        }}
                        className={`w-full h-12 ${isEditing[links.$id] ? 'bg-green-500' : 'bg-indigo-500'} text-white font-semibold rounded-md shadow-lg mt-4 hover:bg-indigo-600 transition duration-300`}
                      >
                        {isEditing[links.$id] ? 'Save' : 'Edit'}
                      </button>

                      {/* Delete QR Button */}
                      {links.$id in qrImages && (
                        <button
                          onClick={() => deleteQR(links.$id)}
                          className="w-full h-12 bg-red-500 text-white font-semibold rounded-md shadow-lg mt-4 hover:bg-red-600 transition duration-300"
                        >
                          Delete QR
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No Links found</p>
              )}
            </div>
          </div>
        </>
      ) : (
        // <Loading></Loading>
        <h1>sjadsebkj </h1>
      )}
    </div>
  );
};

export default Qr;