const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const connection = async () => {
    try {
        // Usa la variable de entorno para la URI de conexión
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri, {
            // Las opciones no son necesarias en versiones recientes
        });
        console.log('Conexión exitosa a la base de datos ropa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = connection;
