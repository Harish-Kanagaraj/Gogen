// app.js

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const secretKey = 'your_secret_key'; // Replace with a strong secret key in production

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample user data (replace with database in real application)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; // Authorization: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is not provided.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

// Route to login and generate a JWT token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Mock authentication - replace with database query in real application
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully.', user: req.user });
});

// Example of a route that requires token but doesn't have it
app.get('/example', (req, res) => {
    res.status(401).json({ message: 'Access denied. Token is not provided.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
