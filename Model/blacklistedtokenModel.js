const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token:
    {
        type:String,
        required:true,
    }
})

const blacklistedtokenModel = mongoose.model('blacklistedtoken', blacklistedTokenSchema);

module.exports = blacklistedtokenModel;
    