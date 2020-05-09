const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parqueSchema = new Schema([
  {
    label: { type: String, require: true },
    ocupado: { type: Boolean, require: true },
  },
  { timestamps: true },
]);

module.exports = mongoose.model('Lugar', registoSchema);
