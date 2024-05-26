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
    plus: {
        type: Number,
        required: [true, 'plus is required']
    },
    profile: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile'
    }
}, { timeStamp: true })


GlassColor.pre(/^find/, function (next) {
    this.populate({
        path: 'profile',
        select: 'brandname -_id',
    })
    next()
})
module.exports = mongoose.model("GlassColor", GlassColor)