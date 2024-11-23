const http = require('http');
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

const server = http.createServer((req, res) => {
    const publicDir = path.join(__dirname, '../public');

    if (req.url === '/main' || req.url === '/') {
        serveStaticFile(res, path.join(publicDir, 'main.html'), 'text/html');
    } else if (req.url === '/analytics') {
        serveStaticFile(res, path.join(publicDir, 'analytics.html'), 'text/html');
    }
    else if (req.url.startsWith('/components/')) {
        const componentPath = path.join(publicDir, req.url);
        serveStaticFile(res, componentPath, 'text/html');
    }
    else if (req.url.endsWith('.css')) {
        serveStaticFile(res, path.join(publicDir, req.url), 'text/css');
    } else if (req.url.endsWith('.js')) {
        serveStaticFile(res, path.join(publicDir, req.url), 'application/javascript');
    } else {
        serveStaticFile(res, path.join(publicDir, 'error.html'), 'text/html', 404);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
