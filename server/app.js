const http = require('http');
const handleApiRoutes = require('./routes/apiRoutes');
const handleStaticRoutes = require('./routes/staticRoutes');

const server = http.createServer((req, res) => {
    if (handleApiRoutes(req, res)) {
        return;
    }

    handleStaticRoutes(req, res);
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
