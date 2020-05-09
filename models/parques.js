const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parqueSchema = new Schema([
  {
    nome: { type: String, require: true },
    precoPorHora: { type: Number, require: true },
    lugares: [{ type: Schema.Types.ObjectId, ref: 'Lugar', require: true }],
  },
  { timestamps: true },
]);

module.exports = mongoose.model('Parque', parqueSchema);
