import { useEffect, useState } from 'react';
import { useAuth } from '../Auth/useAuth'; // Assuming the useAuth hook is stored in hooks folder

export const About = () => {
  const { user, updateUser, getUserDetails, users } = useAuth(); // Import updateUser from the useAuth hook
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
 
  // console.log(user?.$id)
// console.log(users)
// console.log("User Detail")
// getUserDetails(user?.$id);
  //   console.log(user)
  // Fetch user data when component mounts
  useEffect(() => {
      // getUserDetails(user?.$id);
        // console.log(users[0].$id)
    if (user) {
      setFormData({
        name: user.name|| '', // Name might not be directly stored in Appwrite
        email: user.email,
        password: user.password,
      });
      

    }
    getUserDetails(user?.$id);
    // console.log("users-"+ user )
    // console.log(formData)
  }, [user]);

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call updateUser from the hook
      await updateUser(formData.password, formData.name);

      setIsEditing(false); // Exit edit mode after update
      //   window.location.reload();
    } catch (error) {
      console.error('Error updating user details:', error);
      //   window.location.reload();
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching user
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}

                disabled
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password (Required to update email)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div>
            <p className="text-gray-700">Name: {formData.name || 'Not available'}</p>
            <p className="text-gray-700">Email: {formData.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
