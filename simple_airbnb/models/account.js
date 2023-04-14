const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
}, /*{timestamps: true}*/)

const Account = mongoose.model('Account', accountSchema)
module.exports = Account;