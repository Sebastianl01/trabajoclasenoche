const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Autenticar usuario y obtener token (LOGIN)
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            esAdmin: user.esAdmin,
            token: generateToken(user._id, user.esAdmin),
        });
    } else {
        res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
};

// @desc    Registrar un nuevo usuario (SOLO CLIENTE)
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { nombre, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'El usuario ya existe' });
        return;
    }

    const user = await User.create({
        nombre,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            esAdmin: user.esAdmin,
            token: generateToken(user._id, user.esAdmin),
        });
    } else {
        res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
};

module.exports = { authUser, registerUser };