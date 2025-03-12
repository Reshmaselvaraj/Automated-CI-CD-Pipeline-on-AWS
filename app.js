const express = require('express');  
const path = require('path');
const app = express();  

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve static files from 'public' folder
app.use(express.static('public'));

// Home route (serving HTML page)
app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});  

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', uptime: process.uptime() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 App running on port ${PORT}`));  
