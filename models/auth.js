const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    email: { type: String, require: true },
    password: { type: String, require: true },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    isAdmin: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Auth', authSchema);
