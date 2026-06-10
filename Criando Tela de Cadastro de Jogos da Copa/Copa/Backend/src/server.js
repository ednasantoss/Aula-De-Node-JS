require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const database = require("./config/data/db");
app.use(express.json());
app.use(cors());

app.get("/health", async (request, response) => {
    try {
        await database.query('SELECT 1')
        return response.status(200).json({
            status: "ok",
            database: "Conectado",
        })
    } catch (error) {
        return response.status(500).json({
            status: "erro",
            database: "Desconectado",
            erro: error.message
        });
    }
});

app.get("/api/equipes", async (request, response) => {
    try {
        const [equipes] = await database.query(`
            SELECT * FROM equipes`);
        return response.status(200).json(
            equipes
        );

    } catch (error) {
        return response.status(500).json({
            status: 'erro',
            mensagem: 'Erro ao buscar jogos',
            erro: error.message
        });
    }
});

app.get("/api/partidas", async (request, response) => {
    try {
        const [partidas] = await database.query(`SELECT * FROM partidas ORDER BY data_partida ASC`);
        return response.status(200).json(partidas)
    } catch (error) {
        return response.status(500).json({
            status: 'erro',
            mensagem: 'Erro ao listar partidas',
            erro: error.message
        });
    }
});

app.post("/api/partidas", async (request, response) => {
    const { data_partida, equipe1_id, equipe2_id, gols_equipe1 = null, gols_equipe2 = null, status = 'agendada' } = request.body;
    try {

        const partidas = await database.query(`INSERT INTO partidas(data_partida, equipe1_id, equipe2_id, gols_equipe1, 
gols_equipe2, status) VALUES (?,?,?,?,?,?)`, [data_partida, equipe1_id, equipe2_id, gols_equipe1, gols_equipe2, status]);

        response.status(201).json({ id: partidas.insertId, data_partida, equipe1_id, equipe2_id, gols_equipe1, gols_equipe2, status });

    } catch (error) {
        return response.status(500).json({
            status: 'erro',
            mensagem: 'Erro ao listar partidas',
            erro: error.message
        });
    }
});

app.put("/api/partidas/:id", async (request, response) => {
    const { id } = request.params;
    const { gols_equipe1, gols_equipe2, status } = request.body;
    try {
        await database.query(`UPDATE partidas SET gols_equipe1 = ?, gols_equipe2 = ?, status = ? WHERE id = ?`, [gols_equipe1, gols_equipe2, status, id]);

        return response.status(200).json({
            mensagem: "Partida atualizada com sucesso!",
            id, gols_equipe1, gols_equipe2, status
        });

    } catch (error) {
        return response.status(500).json({
            status: 'erro',
            mensagem: 'Erro ao listar partidas',
            erro: error.message
        });
    }
});

app.delete("/api/partidas/:id", async (request, response) => {
    const {id} = request.params;
    try {
        await database.query(`DELETE FROM partidas WHERE id = ?`, [id]);
        return response.status(200).json({
            message: `Partida com ID ${id} deletada com sucesso!`
        });
    } catch (error) {
        return response.status(500).json({
            status: 'erro',
            message: 'Erro ao deletar Partida.',
            erro: error.message
        });
    }
});


app.listen(1327, () => {
    console.log(`Server is running on http://localhost:1327/health`);
    console.log(`Server is running on http://localhost:1327/api/equipes`);
    console.log(`Server is running on http://localhost:1327/api/partidas`);
});