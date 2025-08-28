const Products = require('../../models/Products');

async function createProducts(req, res) {
    const {
        name,
        lote,
        unitValue,
        cant_available,
    } = req.body;
    const existProduct = await Products.findOne({ where: { name, lote } });
    const existLote = await Products.findOne({ where: { lote } });
    if(existLote && !existProduct){
        return res.status(400).json({ message: 'El lote ya existe para otro producto. Por favor, elija un lote diferente.' });
    }
    try{
        if(existProduct){
            await Products.update({ cant_available: cant_available }, { where: { id: existProduct.id } });
            res.status(200).json({ message: 'El producto ya existía para ese lote. Se actualizó su cantidad exitosamente' });
        }else{
            await Products.create({
                name,
                lote,
                unitValue,
                cant_available,
                status: 'Activo',
                date_in: new Date(),
            });
            res.status(201).json({ message: 'Producto creado exitosamente' });
        }

    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos', errorDetails: error.message});
    }
}

async function getProducts(req, res) {
    try {
        //gt es mayor que
        const products = await Products.findAll({where: { status: 'Activo',  }});
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

async function getProductByUuid(req, res) {
    const { uuid } = req.params;
    try {
        const product = await Products.findOne({ where: { uuid } });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ error: 'Error al obtener producto por ID' });
    }
}

async function updateProducto(req, res) {
    const { uuid, name, lote, unitValue, cant_available } = req.body;
    try {
        const existProduct = await Products.findOne({ where: { uuid } });
        if (existProduct) {
            await Products.update({ name, lote, unitValue, cant_available }, { where: { uuid } });
            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
}

async function inactiveProduct(req, res) {
    const { uuid } = req.params;
    try {
        const existProduct = await Products.findOne({ where: { uuid } });
        if (existProduct) {
            await Products.update({ status: 'Inactivo' }, { where: { uuid } });
            res.status(200).json({ message: 'Producto inactivado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al inactivar producto:', error);
        res.status(500).json({ error: 'Error al inactivar producto' });
    }
}

module.exports = {
    createProducts,
    getProducts,
    getProductByUuid,
    updateProducto,
    inactiveProduct
};