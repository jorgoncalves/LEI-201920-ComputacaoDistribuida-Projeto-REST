const Cliente = require('../models/clientesHibituais');

const { catchAsync } = require('../util/catchAsync');

exports.getAllClients = catchAsync(async (req, res, next) => {
  const clientes = await Cliente.find();
  console.log(clientes);
  res.status(200).json(clientes);
});

exports.createNewClient = catchAsync(async (req, res, next) => {
  const { nome, matriculas, carregamento } = req.body;
  const client = new Cliente({
    nome: nome,
    matriculas: matriculas,
    saldoEmCartao: carregamento,
  });
  console.log(client);
  const respSave = await client.save();
  res.status(201).json(respSave);
});

exports.updateClient = catchAsync(async (req, res, next) => {
  // no frontend ir buscar todos as matriculas e saldo atual do cliente
  const id = req.params.id;
  const { nome, matriculas, carregamento } = req.body;
  const client = await Cliente.findById(id);
  client.nome = nome;
  client.matriculas = matriculas;
  client.saldoEmCartao = carregamento;
  const respSave = await client.save();
  res.status(201).json(respSave);
});
