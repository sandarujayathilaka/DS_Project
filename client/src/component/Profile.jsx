import React, { useState,useEffect } from 'react';
import showPasswordIcon from '../assets/show.png'; 
import hidePasswordIcon from '../assets/hide.png';

import axios from 'axios';
import Header from './Header';
import useUserStore from "@/stores/auth";
import toast from "react-hot-toast";
const Profile = () => {
  const user = useUserStore((state) => state.user); 

  const setUser = useUserStore((state) => state.setUser); 


 
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

  const validateName = (newName) => {
    return newName.length >= 4;
  };

  const handleNameClick = async () => {
    if (!validateName(newName)) {
      toast.error("Name must be at least 4 characters long.");
      

      return;
    }
    try {
      const response = await axios.put(
        "https://udemy.dev/api/adminprofile/name",
        { name: newName,id:user.id  }
      );
      console.log("Update successful:", response.data);
     
      setUser({ ...user, name: newName });
      
        toast.success("Name updated successfully.");
      
    
    
     
    
      setEditName(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {

      if (error.response && error.response.data && error.response.data.error) {
   
        toast.error(error.response.data.error);
      
      } else {
        toast.error("Failed to update name. Please try again.");
        
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
    
    if (!validateEmail(newEmail)) {
      toast.error("Invalid email format.");
     

      return;
    }
    try {
      const response = await axios.put(
        "https://udemy.dev/api/adminprofile/email",
        { email: newEmail,id:user.id  }
      );
    
    
      setUser({ ...user, email: newEmail });
      toast.success("Email updated successfully.");
     
      setEditEmail(false);
    
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
     
      if (error.response && error.response.data && error.response.data.error) {
       
        toast.error(error.response.data.error);
        
      } else {
      
        toast.error("Failed to update email. Please try again.");
        
      }
    }
  };
  const validatePassword = (password) => {

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handlePasswordChange = async(e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      toast.error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
     
     
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");  
      return;
    }

    
    
    try {
      const response = await axios.put(
        "https://udemy.dev/api/adminprofile/pass",
        { confirmPwd:currentPassword , pwd:newPassword, matchPwd:confirmNewPassword,id:user.id  }
      );
      
      setUser({ ...user, password: currentPassword });
      toast.success("Password updated successfully.");
      
      setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    } catch (error) {
      
     
      if (error.response && error.response.data && error.response.data.error) {
        
        toast.error(error.response.data.error);
       
      } else {
     
        toast.error("Failed to update password. Please try again.");
        
      }
    }

  };

  return (
    <Header>
    <div className='flex justify-center items-center h-full mt-20 mb-20 bg-white'>
      <div className="w-96 bg-green-200 p-4 rounded-lg">
        <div className="mb-4 text-center font-bold uppercase">{user.role}</div>

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
                className="absolute top-1/2 right-2 transform -translate-y-1/2 "
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
          <button className="block mb-2 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Change Password</button>
          
        </form>
      </div>
    </div>
    </Header>
  );
};

export default Profile;
