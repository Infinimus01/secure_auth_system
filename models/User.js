const mongoose = require('mongoose');
const { string } = require('prop-types');

const userSchema = new mongoose.Schema({

    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true}
});

module.exports= mongoose.model("User", userSchema);