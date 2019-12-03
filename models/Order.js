const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const OrderSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    type: {
        type: String,
        required: true
    }
})

OrderSchema.plugin(passportLocalMongoose)
module.exports = Order = mongoose.model('order', OrderSchema)