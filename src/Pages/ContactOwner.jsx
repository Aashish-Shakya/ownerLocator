// src/pages/ContactOwner.jsx
import React, { useState } from 'react';
import { sendEmail } from '../appwrite/resend'; // Import sendEmail function
import Loading from '../components/Loading'; // Assuming you have a loading component

const ContactOwner = () => {
  const [email, setEmail] = useState(''); // User's email
  const [message, setMessage] = useState(''); // User's message
  const [status, setStatus] = useState(''); // Status message
  const [loading, setLoading] = useState(false); // Loading state

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true); // Show loading spinner

    try {
      // Call the sendEmail function from resend.jsx
      await sendEmail(
        'shakyaaashish700@gmail.com', // To whom to we have to send
        'Vehicle Inquiry', // Subject of the email
        // `<p><strong>From:</strong> "${email}"</p><p>${message}</p>`  
        `<p><strong>From:</strong> "TestingApp"</p><p>${message}</p>` // Email content, includes user's email and message
      );
      setStatus('Email sent successfully!'); // Update status message on success
    } catch (error) {
      setStatus('Failed to send email. Please try again later.'); // Error message on failure
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Contact Vehicle Owner</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        {/* <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div> */}

        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Your Message
          </label>
          <textarea
            id="message"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="5"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
        >
          {loading ? 'Sending...' : 'Send Email'}
        </button>
      </form>

      {/* Display status message */}
      {status && (
        <p className={`mt-4 text-center ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </p>
      )}

      {/* Display loading spinner if email is being sent */}
      {loading && (
        <div className="mt-4 flex justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ContactOwner;
