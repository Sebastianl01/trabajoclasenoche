const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

// Importar los Middlewares de seguridad
const { protect, admin } = require('../middleware/authMiddleware');

// Rutas sin ID (Obtener todos [público] y Crear uno [privado/admin])
router.route('/')
    .get(getProducts) // Todos pueden ver
    .post(protect, admin, createProduct); // Solo el admin con token puede crear

// Rutas con ID (Obtener uno [público], Actualizar [privado/admin], Eliminar [privado/admin])
router.route('/:id')
    .get(getProductById) // Todos pueden ver
    .put(protect, admin, updateProduct) // Solo el admin con token puede actualizar
    .delete(protect, admin, deleteProduct); // Solo el admin con token puede eliminar

module.exports = router;