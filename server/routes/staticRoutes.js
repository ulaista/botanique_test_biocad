const fs = require('fs');
const path = require('path');

function serveStaticFile(res, filePath, contentType, statusCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

function handleStaticRoutes(req, res) {
    const publicDir = path.join(__dirname, '../../public');

    if (req.url === '/main' || req.url === '/') {
        serveStaticFile(res, path.join(publicDir, 'main.html'), 'text/html');
    } else if (req.url === '/analytics') {
        serveStaticFile(res, path.join(publicDir, 'analytics.html'), 'text/html');
    } else if (req.url.startsWith('/components/')) {
        const componentPath = path.join(publicDir, req.url);
        serveStaticFile(res, componentPath, 'text/html');
    } else if (req.url.startsWith('/static/')) {
        const staticPath = path.join(publicDir, req.url);
        const ext = path.extname(staticPath).toLowerCase();
        const mimeTypes = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        serveStaticFile(res, staticPath, contentType);
    } else if (req.url.endsWith('.css')) {
        serveStaticFile(res, path.join(publicDir, req.url), 'text/css');
    } else if (req.url.endsWith('.js')) {
        serveStaticFile(res, path.join(publicDir, req.url), 'application/javascript');
    } else {
        serveStaticFile(res, path.join(publicDir, 'error.html'), 'text/html', 404);
    }
}

module.exports = handleStaticRoutes;
