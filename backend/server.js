// importa librrerías necesarias 
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// 1. Importar rutas
const productRoutes = require('./routes/productRoutes'); // Ya existente
const userRoutes = require('./routes/userRoutes');       // Ya existente
const orderRoutes = require('./routes/orderRoutes');     // ¡IMPORTANTE! Nuevo para Órdenes

// Cargar variables de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

// Configurar Express
const app = express();

// Middlewares:
// Permite que Express lea datos JSON del cuerpo de la petición
app.use(express.json()); 
// Permite que los Frontends se conecten
app.use(cors()); 

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API está corriendo...');
});

// 2. Conectar Rutas (Punto Clave)
app.use('/api/products', productRoutes); // Ruta de Productos
app.use('/api/users', userRoutes);       // Ruta de Usuarios
app.use('/api/orders', orderRoutes);     // ¡CONEXIÓN DE ÓRDENES!

// 3. Manejo de errores 404 (Middleware de Manejo de Errores)
app.use((req, res, next) => {
    const error = new Error(`Ruta No Encontrada - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Manejador de errores general
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});


// 4. Iniciar el servidor
const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`)
);
