const mongoose = require("mongoose");

const Invoice = new mongoose.Schema({
    items: [
        {
            type: Object,
        }
    ]
},
    { timeStamp: true }
);

module.exports = mongoose.model("Invoice", Invoice);
