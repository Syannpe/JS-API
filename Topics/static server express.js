const express = require('express');
const path = require('path');
const {readFileSync} = require("fs");

const app = express();
const port = 8083;

// Function to get mime type based on file extension
function getMimeType(filePath) {
    const mimeTypeLookup = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.svg': 'image/svg+xml',
        '.mp4': 'video/mp4',
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
    };

    const extname = path.extname(filePath);
    return mimeTypeLookup[extname] || 'text/html';
}

// Middleware to serve static files
app.use(express.static(__dirname));  // Replace 'public' with your static folder name

app.get("/test", (req, res) => {
    console.log(req.headers);
    res.send("test received")
})

// Route to handle all other requests (assuming they are for static files)
/*app.get('*', (req, res) => {
    const filePath = path.join(__dirname, decodeURIComponent(req.path));  // Replace 'public' with your static folder name


    console.log(filePath)
    try {
        const file = readFileSync(filePath);
        res.status(200);
        res.setHeader('Content-Type', getMimeType(filePath));
        res.send(file);
    } catch (error) {
        res.status(404).send('Not Found: ' + error.message);
    }
});*/



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
