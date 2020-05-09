const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registoSchema = new Schema([
  {
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', require: true },
    matricula: { type: String, require: true },
    hora_entrada: { type: Date, require: true, default: Date.now },
    hora_saida: { type: Date },
    parque: { type: Schema.Types.ObjectId, ref: 'Parque', require: true },
    lugar: { type: Schema.Types.ObjectId, ref: 'Lugar', require: true },
    pagamento: { type: Schema.Types.ObjectId, ref: 'Pagamento' },
  },
  { timestamps: true },
]);

module.exports = mongoose.model('Registo', registoSchema);
