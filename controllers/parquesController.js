const Parque = require('../models/parques');
const Lugar = require('../models/lugaresParque');

const { catchAsync } = require('../util/catchAsync');

exports.getAllParques = catchAsync(async (req, res, next) => {
  const parques = await Parque.find().populate('lugares');
  res.status(200).json(parques);
});

exports.createNewParque = catchAsync(async (req, res, next) => {
  const { nome, precoPorHora, numLugares } = req.body;
  const lugares = [];
  const lugaresID = [];
  for (let i = 0; i < numLugares; i++) {
    lugares.push({ label: i, ocupado: false });
  }

  for await ({ label, ocupado } of lugares) {
    const lugar = new Lugar({
      label: label,
      ocupado: ocupado,
    });
    const respSaveLugar = await lugar.save();
    lugaresID.push(respSaveLugar._id);
  }

  const parque = new Parque({
    nome: nome,
    precoPorHora: precoPorHora,
    lugares: lugaresID,
  });
  const respSave = await parque.save();
  res.status(201).json(respSave);
});

exports.updateParque = catchAsync(async (req, res, next) => {});
