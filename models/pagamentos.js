const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pagamentoSchema = new Schema(
  {
    forma: { type: String, require: true },
    valor: { type: Number, require: true },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente'},
  },
  { timestamps: true },
);

module.exports = mongoose.model('Pagamento', pagamentoSchema);
