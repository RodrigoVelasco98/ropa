const {Schema,model} = require('mongoose');

const ropaSchema = Schema({
    nombre:{
        type:String,
        require:true
    },
    cantidad:{
        type:String,
        require:true
    },
    precio:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        require:true
    },
    tipo:{
        type:String,
        require:true
    },
    imagen:{
        type:String,
        require:true,
        default:'ropa.jpg'
    },

})

module.exports = model('ropa',ropaSchema);

