const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mapa.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
