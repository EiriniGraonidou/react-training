const mongoose = require('mongoose');
const { mongo } = require('mongoose/lib');
const Schema = mongoose.Schema;
//destructuring const { Schema } = mongoose; (lines 2 and 3 are equivelant)

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);

