const http = require('http');

let homePageViews = 0;
let aboutPageViews = 0;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        homePageViews++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <h1>Главная страница</h1>
            <p>Количество просмотров: ${homePageViews}</p>
            <a href="/about">Перейти на страницу "О нас"</a>
        `);
    } else if (req.url === '/about') {
        aboutPageViews++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'  });
        res.end(`
            <h1>О нас</h1>
            <p>Количество просмотров: ${aboutPageViews}</p>
            <a href="/">Вернуться на главную страницу</a>
        `);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <h1>404 Not Found</h1>
            <p>Страница не найдена.</p>
            <a href="/">Вернуться на главную страницу</a>
        `);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
