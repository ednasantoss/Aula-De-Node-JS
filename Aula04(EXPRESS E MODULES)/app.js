require(`dotenv`).config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.get("/", (request, response) => {
    response.send("Home")
});

app.get("/app", (request, response) => {
    response.send("App")
});

app.listen(PORT, () => { console.log(`Escutando em http://${HOST}:${PORT}`) });