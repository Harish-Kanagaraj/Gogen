// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Define a middleware function to log request details
function logRequestDetails(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call next() to pass control to the next middleware function
}

// Register the custom middleware globally
app.use(logRequestDetails);

// Define your routes after registering middleware
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
