const mongoose = require("mongoose")

const Layout = new mongoose.Schema({
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
    openingSystem: {
        type: mongoose.Schema.ObjectId,
        ref: 'OpeningSystem'
    }
}, { timeStamp: true })

Layout.pre(/^find/, function (next) {
    this.populate({ // راجعيها ---------------------------------------
        path: 'openingSystem',
        select: 'type -_id',
    })
    next()
})

module.exports = mongoose.model("Layout", Layout)