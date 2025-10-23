const Product = require('../models/Product');

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public (Cualquier persona puede ver la tienda)
const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// @desc    Obtener un solo producto por ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    // Creamos un producto simple de relleno
    const product = new Product({
        nombre: 'Sample name',
        precio: 0,
        user: req.user._id, // Usamos el ID del Admin que viene del token
        imagen: '/images/sample.jpg',
        descripcion: 'Sample description',
        stock: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const { nombre, precio, descripcion, imagen, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        // Actualizamos los campos
        product.nombre = nombre || product.nombre;
        product.precio = precio || product.precio;
        product.descripcion = descripcion || product.descripcion;
        product.imagen = imagen || product.imagen;
        product.stock = stock || product.stock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Producto eliminado con éxito' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};