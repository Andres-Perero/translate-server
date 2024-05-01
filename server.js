const express = require("express");
const bodyParser = require("body-parser");
const translate = require("translate-google");
const cors = require("cors");

const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Middleware CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Ruta GET '/hola' que responde con "Hola" en pantalla
app.get("/hola", (req, res) => {
  res.send("Hola");
});

app.post("/translate", async (req, res) => {
  const { text, target_language } = req.body;

  try {
    const translation = await translate(text, { to: target_language });
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: "Error en la traducción" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor API de traducción en ejecución en el puerto ${PORT}`);
});
