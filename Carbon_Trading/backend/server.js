// Import required packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from React app
    credentials: true,
}));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB '))
    .catch((err) => console.error('Failed to connect to MongoDB ', err));

// --------------------------- SCHEMAS --------------------------------- //

// MongoDB User Schema
const userSchema = new mongoose.Schema({
    name: String,
    designation: String,
    company: String,
    industry: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    // Array to store seller IDs the user is associated with (e.g. buyer's preference list)
    preferredSellers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }],
});

const User = mongoose.model('User', userSchema);

// MongoDB Seller Schema (no changes needed)
const sellerSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    emissionsAvailable: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    price: { type: Number, required: true },
    industry: { type: String, required: true },
});

const Seller = mongoose.model('Seller', sellerSchema);

// MongoDB Request Schema
const requestSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    buyerName: { type: String, required: true },
    companyName: { type: String, required: true },
    dateRequested: { type: Date, required: true },
});

const Request = mongoose.model('Request', requestSchema);

// ------------------------- MIDDLEWARE --------------------------------- //

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token is not valid' });
        req.userEmail = user.email;
        next();
    });
};

// -------------------------- ROUTES ----------------------------------- //

// Signup Route
app.post('/signup', async (req, res) => {
    const { name, designation, company, industry, email, phone, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const newUser = new User({
            name, designation, company, industry, email, phone, password,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        if (user.password !== password) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Route to get all sellers
app.get('/sellers', authenticateToken, async (req, res) => {
    try {
        const sellers = await Seller.find(); // Fetch all sellers
        res.json(sellers);
    } catch (error) {
        console.error('Error fetching sellers:', error);
        res.status(500).json({ error: 'Failed to retrieve sellers' });
    }
});

// Route to create a new seller
app.post('/sellers', authenticateToken, async (req, res) => {
    const { companyName, emissionsAvailable, dueDate, price, industry } = req.body;

    if (!companyName || !emissionsAvailable || !dueDate || !price || !industry) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newSeller = new Seller({
            companyName,
            emissionsAvailable,
            dueDate,
            price,
            industry,
        });

        await newSeller.save();
        res.status(201).json({ message: 'Seller data saved successfully!' });
    } catch (error) {
        console.error('Error saving seller data:', error);
        res.status(500).json({ error: 'Failed to save seller data' });
    }
});

// POST endpoint to handle request submission
app.post('/request', authenticateToken, async (req, res) => {
    const { sellerId, buyerName, companyName } = req.body;

    if (!sellerId || !buyerName || !companyName) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newRequest = new Request({
            sellerId,
            buyerName,
            companyName,
            dateRequested: new Date(),
        });

        await newRequest.save();

        res.status(201).json({ message: 'Request sent successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send request.' });
    }
});

// Route for fetching requests (Notifications)
app.get('/requests', authenticateToken, async (req, res) => {
    try {
        const requests = await Request.find()
            .sort({ dateRequested: -1 }) // Sort by dateRequested descending
            .limit(10); // Limit to show only the latest 10 requests

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching requests.' });
    }
});

// -------------------------- SERVER SETUP ----------------------------- //

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
