const validator = require('validator');

const ValidarDatos = (parametros) => {

    let validar_nombre = !validator.isEmpty(parametros.nombre);
    let validar_precio = !validator.isEmpty(parametros.precio);
    let validar_descripcion = !validator.isEmpty(parametros.descripcion);
    let validar_cantidad = !validator.isEmpty(parametros.cantidad);
    let validar_tipo = !validator.isEmpty(parametros.tipo);

    if(!validar_nombre || !validar_cantidad || !validar_tipo|| !validar_descripcion || !validar_precio){
        throw new Error('Se encontro un parametro vacio');
    }
}

module.exports = {
    ValidarDatos
}