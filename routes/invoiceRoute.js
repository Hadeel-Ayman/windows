const express = require('express');

const { createInvoice } = require('../services/InvoiceService');
const router = express.Router()

router.route('/download-pdf').post(createInvoice)
// router.route('/invoices/:id/download').get(getInvoice)

module.exports = router;