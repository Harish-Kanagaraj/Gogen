// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');

// Creating an instance of Express application
const app = express();

// Middleware to parse application/json request bodies
app.use(bodyParser.json());

// Middleware to parse application/x-www-form-urlencoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// GET request handler for '/'
app.get('/', (req, res) => {
    res.send('Hello, GoGen Technologies');
});

// POST request handler for '/submit'
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Check if name and email are provided
    if (!name || !email) {
        res.status(400).send('Name and Email are required.');
        return;
    }

    res.send(`Form submitted by ${name} (${email})`);
});

// Starting the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
