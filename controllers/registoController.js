const momentjs = require('moment');

const Registo = require('../models/registosDosParques');
const Lugar = require('../models/lugaresParque');
const Parque = require('../models/parques');
const Pagamento = require('../models/pagamentos');
const Cliente = require('../models/clientesHibituais');

const { catchAsync } = require('../util/catchAsync');

exports.getAllRegistos = catchAsync(async (req, res, next) => {
  const registos = await Registo.find();
  console.log(registos);
  res.status(200).json(registos);
});

exports.createNewRegisto = catchAsync(async (req, res, next) => {
  // Não esquecer de verificar se o cliente vêm vazio
  // Utilizar o id do pagamento depois de criar o registo
  // Utilizar new Date() para a hora_entrada
  const { idCliente, matricula, idParque, idLugar } = req.body;

  const registo = new Registo({
    cliente: idCliente,
    matricula: matricula,
    hora_entrada: momentjs(new Date()).format(),
    parque: idParque,
    lugar: idLugar,
  });
  const respSaveRegisto = await registo.save();

  res.status(201).json(respSaveRegisto);
});

exports.updateRegisto = catchAsync(async (req, res, next) => {
  // Utilizar o id do registo ou utilizar parque e lugar para encontrar o registo?
  const {
    idRegisto,
    idCliente,
    matricula,
    idParque,
    idLugar,
    forma,
  } = req.body;

  const registo = await Registo.findOne({ parque: idParque, lugar: idLugar });
  const parque = await Parque.findOne({ parque: idParque });
  const hora_entrada = momentjs(registo.hora_entrada);
  const hora_saida = momentjs();
  const valor =
    momentjs.duration(hora_saida.diff(hora_entrada)).hours() *
    parque.precoPorHora;
  // calcular só numa hora completa?

  const pagamento = new Pagamento({
    forma: forma,
    valor: valor,
    cliente: idCliente,
  });

  const respSavePagamento = await pagamento.save();
  const idPagamento = await respSavePagamento._id;

  registo.pagamento = idPagamento;
  registo.hora_saida = momentjs(new Date()).format();

  const respSaveRegisto = await registo.save();

  res.status(201).json(respSaveRegisto);
});
