const express = require('express');
const router = express.Router();

const invoices = require('../controllers/InvoicesController');

router.post('/create', invoices.createInvoice);
router.get('/get/:uuid', invoices.getInvoiceByUuid);
router.get('/getAll', invoices.getAllInvoices);
router.get('/get-invoices-user/:idUsuario', invoices.getInvoicesByUser);
router.get('/get-orders-user/:idUsuario', invoices.getOrdersByUser);

module.exports = router;
