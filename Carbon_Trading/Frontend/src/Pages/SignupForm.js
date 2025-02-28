import React, { useState } from 'react';
import {
  TextField, Button, Typography, Box, MenuItem, IconButton, InputAdornment, Link
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const industries = [
  'Energy', 'Manufacturing', 'Agriculture', 'Technology',
  'Transport', 'Construction', 'Finance', 'Retail',
  'Healthcare', 'Telecommunications', 'Other'
];

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', designation: '', company: '', industry: '',
    email: '', phone: '', password: '', confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation logic
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.designation) newErrors.designation = 'Designation is required.';
    if (!formData.company) newErrors.company = 'Company is required.';
    if (!formData.industry) newErrors.industry = 'Industry is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (formData.email && !validateEmail(formData.email)) newErrors.email = 'Invalid email format.';
    if (!formData.phone) newErrors.phone = 'Phone number is required.';
    if (formData.phone && !validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number format.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.password && !validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.';
    }
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log('Submitting formData:', formData); // Debug: Check the data being sent

      const response = await axios.post('http://localhost:4000/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error.response?.data); // Debug: Log server error
      setErrors({ form: error.response?.data?.error || 'Signup failed, please try again.' });
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '20px' }}>Signup Form</Typography>
      {errors.form && <Typography color="error" align="center">{errors.form}</Typography>} {/* Display form error */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.designation}
          helperText={errors.designation}
        />
        <TextField
          label="Company Name"
          name="company"
          value={formData.company}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.company}
          helperText={errors.company}
        />
        <TextField
          select
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.industry}
          helperText={errors.industry}
        >
          {industries.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
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
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
        <Box sx={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
        </Box>
      </form>
      <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
        Already have an account?
        <Link href="/login" variant="body2" sx={{ marginLeft: '5px' }} onClick={() => navigate('/login')}>
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
