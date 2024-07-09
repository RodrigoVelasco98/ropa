const ropa = require('../models/ropaModel');
const validator = require('validator');
const {ValidarDatos} = require('../helper/validator');


const consultar = (req,res) => {
    let ver = ropa.find({});
    let numero = req.params.numero;
try{
    if(numero){
        if(!validator.isEmpty(numero) && validator.isNumeric(numero)){
            ver.limit(numero);
        }
        else{
            throw new Error('No se ha ingresado un valor valido');
        }
    }

    ver.sort({fecha:-1});

    ver.exec()
    .then((result) => {
        return res.status(200).json({
            staus: 'Success',
            contador:result.length,
            articulo:result
        })
    }).catch((err) => {
        return res.status(400).json({
            staus: 'Failed',
            mensaje: 'No se logro mostrar los resultados'
        });
    });
}catch(error){
    return res.status(400).json({
        staus: 'Error',
        mensaje: error.message
    });
}
    
}

const borrar = (req,res) =>{
    let borrar_id = req.params.id;

    ropa.findOneAndDelete({_id:borrar_id})
    .then((result) => {
        return res.status(200).json({
            staus: 'Success',
            articulo:result,
            mensaje: 'Se ha borrado el articulo'
        })
    }).catch((err) => {
        return res.status(400).json({
            staus: 'Failed',
            mensaje: 'No se logro borrar el articulo'
        });
    });
}

const buscarUno = (req,res) => {
    let buscar_id = req.params.id;

    ropa.findById({_id:buscar_id})
    .then((result) => {
        return res.status(200).json({
            staus: 'Success',
            articulo:result,
        })
    }).catch((err) => {
        return res.status(400).json({
            staus: 'Failed',
            mensaje: 'No se logro mostrar el resultado'
        });
    });
}

const crear = (req,res) => {
    try{
        let parametros = req.body;

        ValidarDatos(parametros);

        const art = new ropa(parametros)

        art.save()
        .then((result) => {
            return res.status(200).json({
                staus: 'Success',
                articulo:result,
                mensaje:'Se ha guardado cone exito'
            })
        }).catch((error) => {
            return res.status(400).json({
                staus: 'Failed',
                mensaje: 'No se logro guardar el articulo'
            });
        });
    }catch(error){
        return res.status(400).json({
            staus: 'Failed',
            mensaje: error.message
        });
    }

}

module.exports = {
    consultar,
    borrar,
    buscarUno,
    crear
}