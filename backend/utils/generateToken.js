const jwt = require('jsonwebtoken');

const generateToken = (id, esAdmin) => {
    // jwt.sign() crea el token firmado.
    return jwt.sign(
        { id, esAdmin }, // El token contendrá el ID y el rol (admin/cliente)
        process.env.JWT_SECRET, // Usa la clave secreta que pusiste en el .env
        {
            expiresIn: '30d', // El token expirará en 30 días por seguridad
        }
    );
};

module.exports = generateToken;