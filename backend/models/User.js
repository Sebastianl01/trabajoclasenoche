const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Necesario para encriptar la contraseña

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // ¡Clave! Un email no puede estar registrado dos veces
    },
    password: {
        type: String,
        required: true,
    },
    // Campo principal para la redirección y seguridad
    esAdmin: {
        type: Boolean,
        required: true,
        default: false, // Por defecto es cliente.
    },
}, {
    timestamps: true,
});

// -- MÉTODOS DE SEGURIDAD --

// 1. Método para verificar si la contraseña ingresada coincide con la encriptada
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Compara la contraseña sin encriptar (enteredPassword) con la encriptada (this.password)
    return await bcrypt.compare(enteredPassword, this.password);
};

// 2. Middleware para encriptar la contraseña ANTES de guardar el usuario
userSchema.pre('save', async function (next) {
    // Solo si el campo 'password' ha sido modificado (o es nuevo), lo encriptamos
    if (!this.isModified('password')) {
        next(); // Continúa si la contraseña no fue cambiada
    }

    // Genera la "sal" (salt) para la encriptación
    const salt = await bcrypt.genSalt(10);
    // Encripta la contraseña usando la sal
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;