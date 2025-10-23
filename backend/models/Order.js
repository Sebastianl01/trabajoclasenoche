//define como se vera un pedido en la base de datos 
const mongoose = require('mongoose');

// Define cómo se ve cada artículo individual dentro de una orden
const orderItemSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    qty: { type: Number, required: true },
    imagen: { type: String, required: true },
    precio: { type: Number, required: true },
    // Relación con el producto original (importante si queremos verlo en detalle)
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
});

// Define la estructura principal de la Orden
const orderSchema = mongoose.Schema({
    // Usuario que realiza el pedido (Relación con el modelo User)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // Array que contendrá los artículos del pedido (usando el esquema de arriba)
    orderItems: [orderItemSchema],
    
    // Dirección de envío
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    
    // Información de pago
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: { // Datos recibidos al confirmar el pago (simulado)
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    
    // Precios y totales
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    
    // Estados del pedido
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date }, // Fecha en que se pagó
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date }, // Fecha en que se entregó
}, {
    timestamps: true, // Añade automáticamente campos createdAt y updatedAt
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
