const mongoose = require("mongoose")

const Fanlight = new mongoose.Schema({
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
    numOfSegment: {
        type: Number,
        required: [true, 'numOfSegment is required']
    },
    openingSystem: {
        type: mongoose.Schema.ObjectId,
        ref: 'OpeningSystem',
    }
}, { timeStamp: true })

Fanlight.pre(/^find/, function (next) { 
    this.populate({
        path: 'openingSystem',
        select: 'type -_id',
    })
    next()
})

module.exports = mongoose.model("Fanlight", Fanlight)