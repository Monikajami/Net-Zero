import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Typography, Box, IconButton, InputAdornment, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => { 
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
        setFormData(response.data); // Initialize form data with fetched user data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditToggle = () => setEditing(!editing);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:4000/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(formData);
      setEditing(false);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Error updating profile.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:4000/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      alert("Account deleted successfully.");
      navigate('/signup');
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Error deleting account.");
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  return (
    <Box sx={{ width: '100%', padding: '20px', backgroundColor: '#f7f7f7' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: '#333' }}>Profile</Typography>
      {userData ? (
        <Box sx={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editing}
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editing}
            sx={{ marginBottom: '15px' }}
          />
          {editing && (
            <>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                sx={{ marginBottom: '15px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                sx={{ marginBottom: '15px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleEditToggle} sx={{ flex: 1, marginRight: '10px' }}>
              {editing ? 'Cancel' : 'Edit Profile'}
            </Button>
            {editing && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleUpdate}
                sx={{ flex: 1, marginLeft: '10px' }}
              >
                Save Changes
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              onClick={handleOpenDeleteDialog}
              sx={{ flex: 1, marginLeft: '10px' }}
            >
              Delete Account
            </Button>
          </Box>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={handleCloseDeleteDialog}
          >
            <DialogTitle>Delete Account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete your account? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteAccount} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </Box>
  );
};

export default Profile;
