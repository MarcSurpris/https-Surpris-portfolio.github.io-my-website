import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

// Derive __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
};

const server = createServer(async (req, res) => {
    console.log('Request Method: ', req.method);
    console.log('Request URL: ', req.url);

    let filePath;
    if (req.url === '/' || req.url === '/index.html') {
        filePath = join(__dirname, 'index.html');
    } else {
        // Handle other static files (e.g., /style.css, /assets/image.png)
        filePath = join(__dirname, req.url);
    }

    try {
        const data = await readFile(filePath);
        // Get the file extension to set the correct MIME type
        const ext = filePath.slice(filePath.lastIndexOf('.')).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Listening on port 3000.');
});