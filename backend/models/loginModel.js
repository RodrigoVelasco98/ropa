const {Schema,model} = require('mongoose');

const loginSchema = Schema({
    usuario:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    }
})

module.exports = model('login',loginSchema);