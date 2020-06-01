const Parque = require('../models/parques');
const Lugar = require('../models/lugaresParque');

const { catchAsync } = require('../util/catchAsync');

exports.getAllParques = catchAsync(async (req, res, next) => {
  const parques = await Parque.find().populate('lugares');
  res.status(200).json(parques);
});

exports.findPark = catchAsync(async (req, res, next) => {
  try {
    const parque = await Parque.findOne(req.body).populate('lugares');
    console.log('parque, ', parque);
    res.status(200).json(parque);
  } catch (error) {
    console.log(error);
  }
});

exports.createNewParque = catchAsync(async (req, res, next) => {
  const { nome, precoPorHora, numLugares, numMobilidadeReduzida } = req.body;
  const lugaresID = await createLugares(numLugares, numMobilidadeReduzida);

  const parque = new Parque({
    nome: nome,
    precoPorHora: precoPorHora,
    lugares: lugaresID,
  });
  const respSave = await parque.save();
  res.status(201).json(respSave);
});

exports.updateParque = catchAsync(async (req, res, next) => {
  const {
    _id,
    nome,
    precoPorHora,
    numLugares,
    numMobilidadeReduzida,
  } = req.body;
  const parque = await Parque.findById(_id);
  parque.nome = nome;
  parque.precoPorHora = precoPorHora;
  parque.lugares.forEach(async (element) => {
    await Lugar.findByIdAndDelete(element);
  });
  parque.lugares = await createLugares(numLugares, numMobilidadeReduzida);
  const respSave = await parque.save();
  res.status(200).json({
    status: 200,
    message: 'Park updated!',
    data: {
      ...respSave._doc,
    },
  });
});

const createLugares = async (numLugares, numMobilidadeReduzida) => {
  const lugares = [];
  const lugaresID = [];
  for (let i = 0; i < numLugares; i++) {
    if (i < numMobilidadeReduzida)
      lugares.push({ label: i, ocupado: false, mobilidadeReduzida: true });
    else lugares.push({ label: i, ocupado: false, mobilidadeReduzida: false });
  }

  for await ({ label, ocupado, mobilidadeReduzida } of lugares) {
    const lugar = new Lugar({
      label: label + 1,
      ocupado: ocupado,
      mobilidadeReduzida: mobilidadeReduzida,
    });

    const respSaveLugar = await lugar.save();
    lugaresID.push(respSaveLugar._id);
  }
  return lugaresID;
};
