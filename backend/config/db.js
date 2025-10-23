//tiene un propósito central: es el único responsable de establecer y gestionar la conexión entre tu aplicación de Node.js (el backend) y la base de datos de MongoDB Atlas.
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // La URI de conexión se lee de las variables de entorno (el archivo .env)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Para evitar errores de deprecación
            useUnifiedTopology: true, // Para evitar errores de deprecación
            // useCreateIndex: true, // Ya no es necesario
        });

        // Mensaje de conexión exitosa
        console.log(`MongoDB conectado exitosamente: ${conn.connection.host}`);
    } catch (error) {
        // Mensaje de error de conexión
        console.error(`Error de conexión a MongoDB: ${error.message}`);
        // Salir del proceso con fallo
        process.exit(1);
    }
};

module.exports = connectDB;