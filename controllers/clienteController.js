const Cliente = require('../models/clientesHibituais');
const Registo = require('../models/registosDosParques');

const { catchAsync } = require('../util/catchAsync');

exports.getAllClients = catchAsync(async (req, res, next) => {
  const clientes = await Cliente.find();
  res.status(200).json(clientes);
});

exports.getClient = catchAsync(async (req, res, next) => {
  const cliente = await Cliente.findById(req.params.id);
  res.status(200).json(cliente);
});

exports.findClient = catchAsync(async (req, res, next) => {
  try {
    setTimeout(async () => {
      const cliente = await Cliente.findOne(req.body);
      console.log('cliente, ', cliente);
      res.status(200).json(cliente);
    }, 500);
  } catch (error) {
    console.log(error);
  }
});

exports.createNewClient = catchAsync(async (req, res, next) => {
  const { nome, matriculas, carregamento } = req.body;
  const client = new Cliente({
    nome: nome,
    matriculas: matriculas,
    saldoEmCartao: carregamento,
  });
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
  res.status(200).json({
    status: 200,
    message: 'User updated!',
    data: {
      ...respSave._doc,
    },
  });
});

exports.clientHistory = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const clientHistoryData = await Registo.find({ cliente: id })
      .populate('parque', ['nome', 'precoPorHora'])
      .populate('lugar', 'label')
      .populate('pagamento', ['forma', 'valor']);
    res.status(200).json({
      status: 200,
      message: 'User register history!',
      data: clientHistoryData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: 'Something went wrong!',
      data: {
        ...error,
      },
    });
  }
});
