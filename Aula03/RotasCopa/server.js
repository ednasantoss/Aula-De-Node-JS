const http = require('http');
const PORT = '3000';
const host = 'localhost';
const fileSystem = require('fs');

const server = http.createServer((request, response) => {
    const url = request.url;
    const headers = { "content-type": "text/html; charset=utf8" };

    switch (url) {

        case "/":
            const html = fileSystem.readFileSync("index.html", "utf-8");
            const css = fileSystem.readFileSync("style.css", "utf-8");
            const js = fileSystem.readFileSync("script.js", "utf-8");

            let paginaFinal = html.replace('<link rel="stylesheet" href="style.css" />', `<style>${css}</style>`)
                .replace('<script src="script.js" defer></script>', `<script>${js}</script>`)
            response.writeHead(200, headers);
            response.write(paginaFinal);
            break;

        case "/sobre":
            response.writeHead(200, headers);
            response.write(fileSystem.readFileSync("sobre.html"));
            break;

        default:
            response.writeHead(404, headers);
            response.write(fileSystem.readFileSync("error.html"));
            break;
    }

    response.end();
});

server.listen(PORT, () => {
    console.log(`rodando http://${host}:${PORT}`);
});