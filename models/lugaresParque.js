const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lugaresSchema = new Schema(
  {
    label: { type: String, require: true },
    ocupado: { type: Boolean, require: true },
    mobilidadeReduzida: { type: Boolean },
    reservado: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lugar', lugaresSchema);
