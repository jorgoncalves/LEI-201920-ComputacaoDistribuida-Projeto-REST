const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clienteSchema = new Schema(
  {
    nome: { type: String, require: true },
    matriculas: [String],
    // Utilizar NumberDecimal para escrever e toFixed(2) para garantir decimal de 2 digitos
    saldoEmCartao: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cliente', clienteSchema);
