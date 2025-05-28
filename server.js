const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/localizacao", (req, res) => {
  const { latitude, longitude, horario } = req.body;
  const linha = `Latitude: ${latitude}, Longitude: ${longitude}, Horário: ${horario}\n`;

  fs.appendFile("localizacoes.txt", linha, (err) => {
    if (err) {
      console.error("Erro ao salvar:", err);
      return res.status(500).send("Erro ao salvar dados");
    }
    console.log("Salvo:", linha.trim());
    res.send("Localização recebida!");
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});