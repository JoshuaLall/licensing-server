const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// A simple endpoint that returns license validation (you can enhance it later)
app.get('/validate-license', (req, res) => {
    const { licenseKey } = req.query;
    
    // For demonstration, let's assume a static valid license
    const validLicense = "VALID_LICENSE_KEY";

    if (licenseKey === validLicense) {
        res.status(200).json({ valid: true, message: 'License is valid' });
    } else {
        res.status(400).json({ valid: false, message: 'License is invalid' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
