const mongoose = require('mongoose');

const connection = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/ropa');
        console.log('Conexion exitosa a la base de datos ropa')
    }catch(error){
        throw new Error('Erro al conectar a la base de datos');
        console.log(error);
    }
}

module.exports = connection;