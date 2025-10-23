const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    user: { // Quién creó este producto (opcional, pero buena práctica)
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    // Podrías añadir un campo para saber cuántas veces se ha comprado (para estadísticas)
    numVentas: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;