const express = require('express');
const router = express.Router();
// Importamos las funciones de login y registro que ya creaste
const { authUser, registerUser } = require('../controllers/userController');

// POST a /api/users/login (Iniciar Sesión)
router.post('/login', authUser);

// POST a /api/users/register (Crear Nuevo Cliente)
router.post('/register', registerUser); 

module.exports = router;