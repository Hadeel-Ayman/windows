const mongoose = require("mongoose")

const GlassColor = new mongoose.Schema({
    image: {
        type: String,
        required: [true, 'image is required']
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    slug: {
        type: String,
        lowercase: true
    },
    plus: {
        type: Number,
        required: [true, 'plus is required']
    }
}, { timeStamp: true })

module.exports = mongoose.model("GlassColor", GlassColor)