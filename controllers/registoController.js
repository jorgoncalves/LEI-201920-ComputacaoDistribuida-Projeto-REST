const Registo = require('../models/registosDosParques');
const Lugar = require('../models/lugaresParque');
const Parque = require('../models/parques');
const Pagamento = require('../models/pagamentos');
const Cliente = require('../models/clientesHibituais');

const { catchAsync } = require('../util/catchAsync');

exports.getAllRegistos = catchAsync(async (req, res, next) => {});

exports.createNewRegisto = catchAsync(async (req, res, next) => {});

exports.updateRegisto = catchAsync(async (req, res, next) => {});
