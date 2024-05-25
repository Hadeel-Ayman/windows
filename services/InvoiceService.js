const Invoice = require('../models/invoiceModel');

exports.createInvoice = async (req, res) => {
    try {
        const { items } = req.body;

        const invoice = new Invoice({ items: items });
        await invoice.save();

        res.status(201).json('invoice was successfully');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};