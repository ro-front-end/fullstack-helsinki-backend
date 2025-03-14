const express = require("express");
const path = require("path");

const app = express();

// Middleware para analizar JSON
app.use(express.json());

// Sirve los archivos estáticos desde la carpeta "dist"
app.use(express.static(path.join(__dirname, "dist")));

// Ruta de ejemplo para la API
let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
];

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// Maneja todas las demás rutas enviando el archivo "index.html"
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
