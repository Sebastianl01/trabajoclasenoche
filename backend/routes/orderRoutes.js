//controlador de ordenes 
const express = require('express');
const router = express.Router();
// Importamos las funciones del controlador de órdenes
const { 
    addOrderItems, 
    getOrderById, 
    updateOrderToPaid, 
    getMyOrders 
} = require('../controllers/orderController');

// Importamos el middleware de protección (para asegurar que el usuario esté autenticado)
const { protect } = require('../middleware/authMiddleware');

// Las rutas se definen en el orden de complejidad o funcionalidad:

// Ruta POST para crear una nueva orden, y también GET para obtener mis órdenes (rutas sin ID)
router.route('/')
    .post(protect, addOrderItems);

// Ruta GET para obtener las órdenes del usuario autenticado (debe ir antes de la ruta con :id)
router.route('/myorders')
    .get(protect, getMyOrders);

// Ruta GET para obtener una orden específica por ID
router.route('/:id')
    .get(protect, getOrderById);

// Ruta PUT para actualizar el estado de pago de una orden específica
router.route('/:id/pay')
    .put(protect, updateOrderToPaid);


module.exports = router;
