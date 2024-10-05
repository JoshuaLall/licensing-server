const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// Store valid license keys and their associated HWIDs
const licenseData = {
    "kzSAxkzKRWJmaeppoSXbquAdQHe5061v": null, // HWID will be stored here for Mouui
    "xI0ZLOydkCojWbJsngesFcJrUbV3xY2k": null,  // HWID will be stored here for Jin
    "NaqJiWygK3Vor1EwYtfUI2TnammJxAQk": null,  //HWID will be stored here for Skiziti
    "5VDG5xDHWYkqV7MRRwftzSOzQqbcSu8U": null  // HWID will be store here for Blade
};

// A simple endpoint that returns license validation
app.get('/validate-license', (req, res) => {
    const { licenseKey, hwid } = req.query;

    // Log the incoming license key and HWID for debugging
    console.log('Received License Key:', licenseKey);
    console.log('Received HWID:', hwid);

    // Check if both the license key and HWID are provided
    if (!licenseKey || !hwid) {
        return res.status(400).json({ valid: false, message: 'License key or HWID is missing' });
    }

    // Check if the provided licenseKey is in the list of valid licenses
    if (licenseData.hasOwnProperty(licenseKey)) {
        // Check if the HWID is already registered for this license key
        if (licenseData[licenseKey] === null) {
            // First time validation: Store the HWID
            licenseData[licenseKey] = hwid;
            console.log(`Registered HWID for license ${licenseKey}: ${hwid}`);
            return res.status(200).json({ valid: true, message: 'License is valid and HWID registered' });
        } else if (licenseData[licenseKey] === hwid) {
            // HWID matches the stored HWID for this license
            return res.status(200).json({ valid: true, message: 'License and HWID are valid' });
        } else {
            // HWID does not match the stored HWID for this license
            return res.status(400).json({ valid: false, message: 'License key is already in use on another machine' });
        }
    } else {
        return res.status(400).json({ valid: false, message: 'License key is invalid' });
    }
});

// Endpoint to check if a license key is locked (associated with an HWID)
app.get('/is-locked', (req, res) => {
    const { licenseKey } = req.query;

    // Check if licenseKey is provided
    if (!licenseKey) {
        return res.status(400).json({ locked: false, message: 'License key is missing' });
    }

    // Check if the license key exists and has an HWID associated with it (locked)
    if (licenseData.hasOwnProperty(licenseKey)) {
        if (licenseData[licenseKey] !== null) {
            return res.status(200).json({ locked: true, message: 'License key is locked to a machine' });
        } else {
            return res.status(200).json({ locked: false, message: 'License key is not locked to any machine' });
        }
    } else {
        return res.status(400).json({ locked: false, message: 'License key is invalid' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
