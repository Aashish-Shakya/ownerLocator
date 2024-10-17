import { useState, useEffect } from 'react';
import { account, database } from '../appwrite/config'
import { useNavigate } from 'react-router-dom';
import { Query } from 'appwrite';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPass] = useState();
    const [users, setUsers] = useState([]); // State for storing user vehicles



    useEffect(() => {
        const checkLogin = async () => {
            try {
                const currentUser = await account.get('current');
                setUser(currentUser);
                setIsLoggedIn(true);
                
            } catch (e) {
                setIsLoggedIn(false);
                setUser(null);
                // navigate('/signin');
            }
        };

        checkLogin();
    }, [navigate]);

    //login func


    const login = async (email, password) => {

        try {

            //    account.createEmailPasswordSession(email, password);
            //    const currentUser = await account.get('current');
            //    setUser(currentUser);
            //    setIsLoggedIn(true);
            //    navigate("/")

            // Create a session using email and password
            const session = await account.createEmailPasswordSession(email, password);
            console.log("Session created:", session);

            // Set the logged-in user's state after successful login
            setUser({ email, name: session.user?.name });
            setIsLoggedIn(true);
            setIsLoggedIn(true);
            // window.location.reload()

            // alert("Logged in Successfully")
        } catch (e) {
            console.error('Error logging in:', e.message);
            throw new Error("Login failed");
        }
    }

    //Signup
    const signup = async(email, password, name) =>{
        try {
            let res = await account.create('unique()', email, password, name)
            addUserToDatabase(res.$id, email, name, password);
            await login(email, password); 
            window.location.reload();
            navigate('/')
          } catch (err) {
            console.log(err)
          }
    }
      function addUserToDatabase(userId, email, name, password) {
        try {
          var x = database.createDocument('66e423730021a0910a61', '66e423e5000ce57d157b', 'unique()', {
            Email: email,
            Name: name,
            Password: password,
            UserId: userId
          })
          console.log("Addedd to Db successfully")

        } catch (e) {
          console.log(e)
        }
      }
    //logout function
    const logout = async () => {

        try {
            await account.deleteSession("current");
            setIsLoggedIn(false);
            setUser(null);
            navigate('/signin'); // Redirect to login page after logging out
        } catch (e) {
            console.error('Error logging out:', e.message);
        }

    };



    const getUserDetails = async (userId) => {
      try {
          // Fetch documents from the collection specific to the logged-in user using Query.equal
          const response = await database.listDocuments(
              '66e423730021a0910a61',  // Database ID
              '66e423e5000ce57d157b',  // Collection ID
              [Query.equal('UserId', userId)]  // Fetch only documents where 'UserId' matches the logged-in user's ID
          );
  
          // Ensure only user-specific vehicles are set
          setUsers(response.documents); 
          // console.log(response.documents);  // This will log all documents in the collection for the logged-in user
      } catch (e) {
          console.error('Error fetching vehicle details:', e.message);
      }
  };
  
   
  // Update user function
  const updateUser = async (newPassword, newName) => {
    try {
      // Update email if it has changed
      // if (newEmail && newEmail !== user.email) {
      //   await account.updateEmail(newEmail, newPassword); // Password required to update email
      //   console.log("yes")
      // }

      // Update password if provided
      if (newPassword) {
        await account.updatePassword(newPassword);
        
      }

      // Update custom fields (like name) in the database
      if (newName && newName !== user.name) {
        // await database.updateDocument('66e423730021a0910a61', '66e423e5000ce57d157b', user.$id, {
        //   Name: newName,
        //   Email: newEmail || user.email,
        //   Password: newPassword || "unchanged"
        // });
        await account.updateName('66e423730021a0910a61', '66e423e5000ce57d157b', newName);
        console.log("User updated in the database successfully");
      }

      // Refresh user state after update
      const updatedUser = await account.get();
      setUsers(updatedUser);
      // window.location.reload();
    } catch (e) {
      console.error('Error updating user details:', e.message);
      throw new Error("Update failed");
    }
  };




  return { isLoggedIn, user, users, login, logout, signup, updateUser, getUserDetails };
};