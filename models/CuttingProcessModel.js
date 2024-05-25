const mongoose = require("mongoose");

const CuttingProcess = new mongoose.Schema({
    thickenss: {
        type: Number,
        default: 6
    },
    Welding_time: {
        type: Number,
        default: '2m', // 2دقيقة 
    },
    profile: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile'
    }
},
    { timeStamp: true }
);

module.exports = mongoose.model("CuttingProcess", CuttingProcess);
