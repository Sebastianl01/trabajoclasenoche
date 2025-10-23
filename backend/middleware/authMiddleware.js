// esto es como un guardian que protegeRutas sensibles de administrador y usuarios autenticados
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rutas (requiere token válido)
const protect = async (req, res, next) => {
    let token;

    // 1. Verificar si el token existe en los headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extraer el token (quitando 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // 2. Decodificar/verificar el token usando tu clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Buscar al usuario sin la contraseña y adjuntarlo a la petición
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Continuar con la función del controlador
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, token falló' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

// Middleware para restringir el acceso solo a administradores
const admin = (req, res, next) => {
    // Revisa si el usuario adjunto (de protect) existe y si es admin
    if (req.user && req.user.esAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'No autorizado como administrador' });
    }
};

module.exports = { protect, admin };