const Invoices = require('../../models/Invoices');
const Products = require('../../models/Products');
const Orders = require('../../models/Orders');
const Users = require('../../models/Users');

//crear una factura (el cliente hace una compra)
async function createInvoice(req, res) {
    const { idClient, products, total } = req.body;
    try {
        const orders =[];
        const date = new Date();
        const idIncrement = await Invoices.count() + 1;
        const newInvoice = await Invoices.create({
            userId: idClient,
            code: `FAC-${idIncrement}-${date.getFullYear()}`,
            purchase_date: date,
            total_price: total,
        });
        for(const product of products){
            const existProduct = await Products.findOne({ where: { id: product.id } });
            if (existProduct) {
                orders.push({
                    idProduct: product.id,
                    units: product.units,
                    sale_price: product.unitValue,
                    idInvoice: newInvoice.id
                });
                const cant_available = existProduct.cant_available - product.units;
                await Products.update({ cant_available }, { where: { id: product.id } });
            }
        }
        await Orders.bulkCreate(orders);
        res.status(201).json({ message: 'Factura creada exitosamente', factura: newInvoice });
    } catch (error) {
        console.error('Error al crear factura:', error);
        res.status(500).json({ error: 'Error al crear factura' });
    }
}

//obtengo una factura por uuid para ver su detalle (el cliente o el admin quiere ver el detalle)
async function getInvoiceByUuid(req, res) {
    const { uuid } = req.params;
    try {
        const invoice = await Invoices.findOne(
            { where: { uuid },
                include: [
                    { 
                        model: Orders, 
                        attributes: ['sale_price','units'],
                        include: [
                            {
                                model: Products,
                                attributes: ['name', 'lote']
                            }
                        ]  
                    }] 
            }
        );
        if (invoice) {
            res.status(200).json(invoice);
        } else {
            res.status(404).json({ message: 'Factura no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener factura por UUID:', error);
        res.status(500).json({ error: 'Error al obtener factura por UUID' });
    }
}
//obtengo todas las facturas sin importar el usuario (listado para el admin)
async function getAllInvoices(req,res) {
    try {
        const invoices = await Invoices.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['name']
                }
            ]
        });
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error al obtener todas las facturas:', error);
        res.status(500).json({ error: 'Error al obtener todas las facturas' });
    }
}

//obtengo facturas de un usuario (el cliente quiere ver sus facturas)
async function getInvoicesByUser(req, res) {
    const { idUsuario } = req.params;
    try {
        const invoices = await Invoices.findAll({ where: { userId: idUsuario },
            include: [
                {
                    model: Users,
                    attributes: ['name']
                }
            ]
        });
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error al obtener facturas por usuario:', error);
        res.status(500).json({ error: 'Error al obtener facturas por usuario' });
    }
}

async function getOrdersByUser(req, res) {
    const { idUsuario } = req.params;
    try {
        const orders = await Orders.findAll({ 
            attributes: ['units', 'sale_price'], 
            include: [
                {
                    model: Products,
                    attributes: ['name', 'lote'], 
                },
                {
                    model: Invoices,
                    where: { userId: idUsuario }, 
                    attributes: ['code', 'purchase_date'], 
                }
            ] 
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener órdenes por usuario:', error);
        res.status(500).json({ error: 'Error al obtener órdenes por usuario' });
    }
}

module.exports = {
    createInvoice,
    getInvoiceByUuid,
    getAllInvoices,
    getInvoicesByUser,
    getOrdersByUser
};