const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String },
  email:     { type: String, required: true, unique: true },
  password:  { type: String }, // Solo requerido si es 'local'
  photoUrl:  { type: String },
  role:      { type: String, enum: ['admin', 'user'], default: 'user' },
  provider:  { type: String, enum: ['local', 'google', 'github'], default: 'local' },
  events:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
