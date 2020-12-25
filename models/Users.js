const mongoose = require('mongoose');
const { mongo } = require('mongoose/lib');
const Schema = mongoose.Schema;
//destructuring const { Schema } = mongoose; (lines 2 and 3 are equivelant)

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);

