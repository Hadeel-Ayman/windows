const mongoose = require("mongoose")

const Company = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    slug: {
        type: String,
        lowercase: true,
    },
    size: {
        type: String,
    }
}, { timeStamp: true })

module.exports = mongoose.model("Company", Company)