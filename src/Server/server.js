const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Import bodyParser middleware for parsing request bodies
const cors = require('cors'); // Import cors middleware for enabling cross-origin requests

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes setup
const adminRoutes = require('./routes/admin'); // Import adminRoutes module
app.use('/admin', adminRoutes); // Use adminRoutes as middleware for the desired admin dashboard URL

// Start the server
const port = process.env.PORT || 3000; // Set the port number for your server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export 'app' for other files to use
