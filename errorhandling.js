const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const { v4: uuidv4 } = require('uuid');
const { Stream } = require('stream');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});

// Custom writable stream for Morgan
class LoggerStream extends Stream.Writable {
    _write(chunk, encoding, callback) {
        logger.info(chunk.toString().trim()); // Log HTTP request info as info level
        callback();
    }
}

const loggerStream = new LoggerStream();

// Morgan middleware for HTTP request logging
app.use(morgan('combined', { stream: loggerStream }));

// Middleware to parse JSON bodies
app.use(express.json());

// Example data store (in-memory for simplicity)
let users = [];

// Routes
// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res, next) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        return next(error);
    }
    res.json(user);
});

// POST create a new user
app.post('/users', (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
        const error = new Error('Name and email are required');
        error.status = 400;
        return next(error);
    }
    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Error handling middleware
app.use((err, req, res, next) => {
    // Log the error with Winston logger
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // Respond with the appropriate status code and error message
    res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
