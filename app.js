const express = require('express');
const mongoose = require('mongoose');

const app = express();

const clientesRoutes = require('./routes/clientesRoutes');
const parqueRoutes = require('./routes/parquesRoutes');
const registosRoutes = require('./routes/registosRoutes');

const PORT = 3001;

const MONGODB_URI =
  'mongodb+srv://jorge:mongodb@cluster0-8c4e8.mongodb.net/ComputacaoDistribuida-Projeto';

app.use(express.json());

app.use('/clientes', clientesRoutes);
app.use('/parques', parqueRoutes);
app.use('/registos', registosRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ status: status, message: message, data: data });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Connected ate ' + new Date().toLocaleString());
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
