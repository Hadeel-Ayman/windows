const mongoose = require("mongoose");

const WeldingProcess = new mongoose.Schema({
    Welding_Allowance: {
        type: Number,
        default: 6,
    },
    Welding_time: {
        type: Number,
        default: '3m', // 3دقيقة 
    }
},
    { timeStamp: true }
);

module.exports = mongoose.model("WeldingProcess", WeldingProcess);
