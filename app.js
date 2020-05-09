const express = require('express');
const mongoose = require('mongoose');

const app = express();

const clienteRoute = require('./routes/clienteRoutes');

const MONGODB_URI =
  'mongodb+srv://jorge:mongodb@cluster0-8c4e8.mongodb.net/ComputacaoDistribuida-Projeto';

app.use(express.json());

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Connected ate ' + new Date().toLocaleString());
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
