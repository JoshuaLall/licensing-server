const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// Store valid license keys for users
const validLicenses = [
    "kzSAxkzKRWJmaeppoSXbquAdQHe5061v", // User 1
    "xI0ZLOydkCojWbJsngesFcJrUbV3xY2k"  // User 2
];

// A simple endpoint that returns license validation
app.get('/validate-license', (req, res) => {
    const { licenseKey } = req.query;

    // Log the incoming license key for debugging
    console.log('Received License Key:', licenseKey);

    // Check if the license key was provided
    if (!licenseKey) {
        return res.status(400).json({ valid: false, message: 'License key is missing' });
    }

    // Check if the provided licenseKey is in the list of valid licenses
    if (validLicenses.includes(licenseKey)) {
        res.status(200).json({ valid: true, message: 'License is valid' });
    } else {
        res.status(400).json({ valid: false, message: 'License is invalid' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
