const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const SystemVariablesSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    keyName: {
        type: String,
        required: true,
    },
    theValue: {
        type: Schema.Types.Mixed,
        required: true
    }
})

SystemVariablesSchema.plugin(passportLocalMongoose)
module.exports = SystemVariables = mongoose.model('systemVariable', SystemVariablesSchema)