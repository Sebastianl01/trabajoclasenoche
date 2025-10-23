//logica de creacion de pedidos y ontener pedidos de usuarios
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Crear un nuevo pedido (orden)
// @route   POST /api/orders
// @access  Privado (requiere token de usuario)
const addOrderItems = asyncHandler(async (req, res) => {
    // Extrae los datos del cuerpo de la petición (carrito, dirección, etc.)
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // 1. Verifica si hay artículos en la orden
    if (orderItems && orderItems.length === 0) {
        res.status(400).send('No hay artículos en la orden');
        return; // Detiene la ejecución
    } 
    
    // 2. Si hay artículos, crea el objeto Order
    const order = new Order({
        // El ID del usuario lo obtenemos del token (req.user)
        user: req.user._id, 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    // 3. Guarda la orden en MongoDB
    const createdOrder = await order.save();
    
    // 4. Envía la respuesta con el nuevo pedido creado
    res.status(201).json(createdOrder);
});

// @desc    Obtener pedido por ID
// @route   GET /api/orders/:id
// @access  Privado (requiere token de usuario)
const getOrderById = asyncHandler(async (req, res) => {
    // Busca el pedido y "popula" el campo 'user' para obtener el nombre y email
    const order = await Order.findById(req.params.id).populate(
        'user', // Nombre del campo a popular
        'nombre email' // Campos específicos del usuario que queremos
    );

    if (order) {
        // Asegúrate de que solo el dueño del pedido o un admin pueda verlo
        if (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin) {
            res.json(order);
        } else {
            res.status(401).send('No autorizado para ver este pedido');
        }
    } else {
        res.status(404).send('Pedido no encontrado');
    }
});

// @desc    Actualizar pedido a pagado (simulación de pago exitoso)
// @route   PUT /api/orders/:id/pay
// @access  Privado
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        // Datos de simulación de pago (ej. ID de PayPal, estado)
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).send('Pedido no encontrado');
    }
});

// @desc    Obtener todos los pedidos del usuario autenticado
// @route   GET /api/orders/myorders
// @access  Privado
const getMyOrders = asyncHandler(async (req, res) => {
    // Busca todos los pedidos donde el campo 'user' coincida con el ID del usuario logeado
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
});


module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
};
