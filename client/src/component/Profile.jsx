import React, { useState,useEffect } from 'react';
import showPasswordIcon from '../assets/show.png'; // Import your show password icon
import hidePasswordIcon from '../assets/hide.png'; // Import your hide password icon
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios';
import Header from './Header';
import useUserStore from "@/stores/auth";

const Profile = () => {
  const user = useUserStore((state) => state.user); // To get user info of logged in user

  const setUser = useUserStore((state) => state.setUser); // To modify user info in the context (You won't need it)
  const initialUserState = {
    id: '663f2acac96e3c6725f5307d',
    name: 'shakee',
    email: 'shakee@.com',
    role: 'Admin',
  };
  console.log(user)
  const { toast } = useToast()
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'currentPassword':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'newPassword':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirmNewPassword':
        setShowConfirmNewPassword(!showConfirmNewPassword);
        break;
      default:
        break;
    }
  };

  const handleNameEdit = () => {
   
    setEditName(!editName);
    setNewName(user.name);
  };

  const validateName = (name) => {
    return name.length >= 4;
  };

  const handleNameClick = async () => {
    if (!validateName(user.name)) {
      toast({
        variant: "destructive",
        description: "Name must be at least 4 characters long.",
      })

      return;
    }
    try {
      const response = await axios.put(
        "http://udemy.dev/api/adminprofile/name",
        { name: newName,id:user.id  }
      );
      console.log("Update successful:", response.data);
      // Assuming unenrollment was successful, you can update the UI accordingly
      setUser({ ...user, name: newName });
      toast({
        description: "Name updated successfully.",
      });
      setEditName(false);
    } catch (error) {
      console.error("Error Update the profile:", error);
      if (error.response && error.response.data && error.response.data.error) {
        // Display error message from backend in a toast or alert
        toast({
          description: error.response.data.error,
          status: "error",
        });
      } else {
        // Handle generic error message
        toast({
          description: "Failed to update name. Please try again.",
          status: "error",
        });
      }
    }
  };
  const handleEmailEdit = () => {
    setEditEmail(!editEmail);
    setNewName(user.name);
  };

  

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleEmailClick = async () => {
    

    // Validate email
    // if (!validateEmail(user.email)) {
    //   toast({
    //     variant: "destructive",
    //     description: "Invalid email format.",
    //   })

    //   return;
    // }
    try {
      const response = await axios.put(
        "https://udemy.dev/api/adminprofile/email",
        { email: user.email,id:user.id  }
      );
      console.log("Update successful:", response.data);
      // Assuming unenrollment was successful, you can update the UI accordingly
      setUser({ ...user, email: newEmail });
      toast({
        description: "Email updated successfully.",
      });
      setEditEmail(false);
    } catch (error) {
      console.error("Error Update the Email:", error);
      if (error.response && error.response.data && error.response.data.error) {
        // Display error message from backend in a toast or alert
        toast({
          variant: "destructive",
          description: error.response.data.error,
          status: "error",
        });
      } else {
        // Handle generic error message
        toast({
          variant: "destructive",
          description: "Failed to update email. Please try again.",
          status: "error",
        });
      }
    }
  };
  const validatePassword = (password) => {
    // Password must be at least 8 characters and contain at least one uppercase, one lowercase, and one special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handlePasswordChange = async(e) => {
    e.preventDefault();

    // Validate name
  

    // Validate new password
    // if (!validatePassword(newPassword)) {
    //   toast({
    //     variant: "destructive",
    //     description: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    //   })

     
    //   return;
    // }

    // Confirm new password matches
    if (newPassword !== confirmNewPassword) {
      toast({
        variant: "destructive",
        description: "New passwords do not match.",
      })
     
      return;
    }

    
    
    try {
      const response = await axios.put(
        "https://udemy.dev/api/adminprofile/pass",
        { confirmPwd:currentPassword , pwd:newPassword, matchPwd:confirmNewPassword,id:user.id  }
      );
      console.log("Update successful:", response.data);
      // Assuming unenrollment was successful, you can update the UI accordingly
      setUser({ ...user, password: currentPassword });
      toast({
        description: "Password updated successfully.",
      });
      setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    } catch (error) {
      console.error("Error Update the Password:", error);
     
     
      if (error.response && error.response.data && error.response.data.error) {
        // Display error message from backend in a toast or alert
        toast({
          variant: "destructive",
          description: error.response.data.error,
          status: "error",
        });
      } else {
        // Handle generic error message
        toast({
          variant: "destructive",
          description: "Failed to update password. Please try again.",
          status: "error",
        });
      }
    }

  };

  return (
    <Header>
    <div className='flex justify-center items-center h-screen bg-white'>
      <div className="w-96 bg-blue-100 p-4 rounded-lg">
        <div className="mb-4 text-center font-bold">{user.role}</div>

        <div className="mb-4 h-[40px] flex justify-between items-center bg-white rounded-lg">
          <strong className='ml-2'>Name:</strong>
          {editName ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border px-4 py-1 rounded"
            />
          ) : (
            <span>{user.name}</span>
          )}
          <button className='mr-2' onClick={editName ? handleNameClick : handleNameEdit}>{editName ? 'Save' : 'Edit'}</button>
        </div>
        <div className="mb-4 h-[40px] flex justify-between items-center bg-white rounded-lg">
          <strong className='ml-2'>Email:</strong>
          {editEmail ? (
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          ) : (
            <span>{user.email}</span>
          )}
          <button className='mr-2' onClick={editEmail ? handleEmailClick : handleEmailEdit}>{editEmail ? 'Save' : 'Edit'}</button>
        </div>

        <form onSubmit={handlePasswordChange} className='bg-white rounded-lg'>
          <h3 className="mb-4 text-center font-bold text-xl">Change Password</h3>
          <div className="mb-4 ml-2 mr-2">
            <label htmlFor="currentPassword">Current Password:</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={() => togglePasswordVisibility('currentPassword')}
              >
                <img src={showCurrentPassword ? showPasswordIcon : hidePasswordIcon} className="w-5 h-5" alt="Toggle Password" />
              </button>
            </div>
          </div>
          <div className="mb-4 ml-2 mr-2">
            <label htmlFor="newPassword">New Password:</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={() => togglePasswordVisibility('newPassword')}
              >
                <img src={showNewPassword ? showPasswordIcon : hidePasswordIcon} className="w-5 h-5" alt="Toggle Password" />
              </button>
            </div>
          </div>
          <div className="mb-4 ml-2 mr-2">
            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
            <div className="relative">
              <input
                type={showConfirmNewPassword ? 'text' : 'password'}
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="border px-2 py-1 rounded w-full"
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={() => togglePasswordVisibility('confirmNewPassword')}
              >
                <img src={showConfirmNewPassword ? showPasswordIcon : hidePasswordIcon} className="w-5 h-5" alt="Toggle Password" />
              </button>
            </div>
          </div>
          <button className="block mb-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Change Password</button>
          
        </form>
      </div>
    </div>
    </Header>
  );
};

export default Profile;
