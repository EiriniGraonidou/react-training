const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//destructuring const { Schema } = mongoose; (lines 2 and 3 are equivelant)

const recipientSchema = new Schema({
   email: String,
   responded: {type: Boolean, default: false}
});

module.exports = recipientSchema;
