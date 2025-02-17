const momentjs = require('moment');

const Registo = require('../models/registosDosParques');
const Lugar = require('../models/lugaresParque');
const Parque = require('../models/parques');
const Pagamento = require('../models/pagamentos');
const Cliente = require('../models/clientesHibituais');

const { catchAsync } = require('../util/catchAsync');

exports.getAllRegistos = catchAsync(async (req, res, next) => {
  const registos = await Registo.find({ hora_saida: null })
    .populate('parque', ['nome', 'precoPorHora'])
    .populate('lugar', 'label');
  res.status(200).json(registos);
});

exports.getRegisto = catchAsync(async (req, res, next) => {
  try {
    const registo = await Registo.findOne({
      parque: req.body.parque._id,
      lugar: req.body.lugar._id,
      hora_saida: null,
    })
      .populate('parque', ['nome', 'precoPorHora'])
      .populate('lugar', 'label');
    console.log('cliente, ', registo);
    res.status(200).json(registo);
  } catch (error) {
    console.log(error);
  }
});

exports.createNewRegisto = catchAsync(async (req, res, next) => {
  // Não esquecer de verificar se o cliente vêm vazio
  // Utilizar o id do pagamento depois de criar o registo
  // Utilizar new Date() para a hora_entrada
  const { idCliente, matricula, idParque, idLugar } = req.body;
  console.log(idCliente);

  const lugar = await Lugar.findById(idLugar);
  lugar.ocupado = true;
  lugar.save();

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
    valor,
  } = req.body;

  const registo = await Registo.findOne({
    matricula: matricula,
    parque: idParque,
    lugar: idLugar,
    hora_saida: null,
  });
  const parque = await Parque.findOne({ parque: idParque });
  // const hora_entrada = momentjs(registo.hora_entrada);
  // const hora_saida = momentjs();
  // const valor =
  //   momentjs.duration(hora_saida.diff(hora_entrada)).hours() *
  //   parque.precoPorHora;
  // calcular só numa hora completa?

  const lugar = await Lugar.findById(idLugar);
  lugar.ocupado = false;
  lugar.save();

  const pagamento =
    idCliente === ''
      ? new Pagamento({
          forma: forma,
          valor: valor,
        })
      : new Pagamento({
          forma: forma,
          valor: valor,
          cliente: idCliente,
        });

  const respSavePagamento = await pagamento.save();
  const idPagamento = await respSavePagamento._id;

  if (forma === 'Card') {
    const clienteData = await Cliente.findById(idCliente);
    clienteData.saldoEmCartao = clienteData.saldoEmCartao - valor;
    await clienteData.save();
  }

  registo.pagamento = idPagamento;
  registo.hora_saida = momentjs(new Date()).format();

  const respSaveRegisto = await registo.save();

  res.status(201).json(respSaveRegisto);
});
