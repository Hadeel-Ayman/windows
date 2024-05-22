const mongoose = require("mongoose")

const TypeOfUnit = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'type is required']
    }
}, { timeStamp: true })

module.exports = mongoose.model("TypeOfUnit", TypeOfUnit)