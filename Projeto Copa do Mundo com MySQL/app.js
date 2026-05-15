require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7070;
const HOST = process.env.HOST || 'localhost';
const pool = require('./backend/src/db');

app.get("/api/health", (request, response) => {
    response.status(200).json({ ok: true, message: "API online" });
});

app.get("/api/jogos", async (request, response) => {
    try {
        const connection = await pool.getConnection();
        const [jogos] = await connection.query("SELECT * FROM jogos");
        connection.release();
        response.status(200).json({ jogos });

    } catch (error) {

        response.status(500).json({ ok: false, message: `Erro ao buscar os usuarios. ${error}:${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON HTTP://${HOST}:${PORT}/api/jogos`);
    console.log(`SERVER IS RUNNING ON HTTP://${HOST}:${PORT}/api/health`);
});