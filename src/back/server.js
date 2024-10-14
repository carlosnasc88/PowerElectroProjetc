// server.js ou app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const inquilinosRoutes = require('./routes/inquilinosRoutes');
const usuarioRoutes = require ('./routes/usuarioRoutes')
const apartamentosRoutes = require('./controllers/apartamentosController');
const apartamentosController = require('./controllers/apartamentosController');
const usuarioController = require('./src/back/controllers/controllerUsuario');

const db = require('./database/db');




const app = express();
app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to PostgreSQL');
});



app.use('/inquilinos', inquilinosRoutes); 
app.use('/apartamentos', apartamentosRoutes);
app.use('/apartamentos', apartamentosController);
app.use('/usuarios', usuarioRoutes);
app.use('/usuarios', usuarioController);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
