import React, { useState } from 'react';
import axios from 'axios';
import './profile.css';
function ProfilePage() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('');
  // Add other profile fields as needed

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      formData.append('name', name);
      // Append other profile fields to the formData

      await axios.post('/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle successful profile update
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <div>
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handlePictureUpload}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        {/* Add other profile fields */}
        <button type="update">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfilePage;
