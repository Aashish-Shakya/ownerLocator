import { useState } from 'react';
import { account, database } from '../appwrite/config';
import { Query } from 'appwrite';
import { useAuth } from '../Auth/useAuth';

export const useQr = () => {
  const { user } = useAuth();
  const [qrText, setQrText] = useState([]);
  const [qrImages, setQrImages] = useState({});

  // Function to generate random string
  const generateRandomString = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Function to store random string
  const storeRandomString = async (userId) => {
    const generatedString = generateRandomString();
    try {
      if (!userId) {
        alert('UserId is required');
        return;
      }
      await database.createDocument(
        '66e423730021a0910a61',
        '66ebacba0032bba8da0d',
        'unique()',
        {
          UserId: userId,
          QrText: generatedString,
        }
      );
      console.log('Link added successfully');
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  // Fetch stored links
  const getLinks = async (userId) => {
    try {
      const response = await database.listDocuments(
        '66e423730021a0910a61',
        '66ebacba0032bba8da0d',
        [Query.equal('UserId', userId)]
      );
      setQrText(response.documents);
    } catch (e) {
      console.error('Error:', e.message);
    }
  };

  // Dynamic QR
  const generateQR = (link, id) => {
    const dynamicUrl = `${window.location.href}/${link}`;
    setQrImages((prevQrImages) => ({
      ...prevQrImages,
      [id]: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(dynamicUrl)}`,
    }));
  };

  // Function to delete the QR image
  const deleteQR = (id) => {
    setQrImages((prevQrImages) => {
      const updatedQrImages = { ...prevQrImages };
      delete updatedQrImages[id];
      return updatedQrImages;
    });
  };
// Inside useQr.jsx

const updateLink = async (id, newLink) => {
    try {
      // Replace 'YOUR_COLLECTION_ID' and 'YOUR_DOCUMENT_ID' with actual values
      await database.updateDocument(
        '66e423730021a0910a61', // Database ID
        '66ebacba0032bba8da0d', // Collection ID
        id, // Document ID (the link's ID)
        { Link: newLink } // New data
      );
      console.log('Link updated successfully');
    } catch (error) {
      console.error('Error updating link:', error);
    }
  };
  
  return { storeRandomString, getLinks, qrText, generateQR, deleteQR, qrImages, updateLink }; // Include updateLink in the return
}  