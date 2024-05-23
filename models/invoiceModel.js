const mongoose = require("mongoose");

const Invoice = new mongoose.Schema({
    items: Array
},
    { timeStamp: true }
);

module.exports = mongoose.model("Invoice", Invoice);
