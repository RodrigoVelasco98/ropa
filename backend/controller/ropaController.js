const ropa = require('../models/ropaModel');
const validator = require('validator');
const {ValidarDatos} = require('../helper/validator');


const consultar = (req, res) => {
    let query = ropa.find({});

    // Obtener el parámetro de número para la paginación
    let numero = req.params.numero;

    try {
        // Aplicar paginación si se proporciona el parámetro
        if (numero) {
            if (!validator.isEmpty(numero) && validator.isNumeric(numero)) {
                query.limit(parseInt(numero));
            } else {
                throw new Error('No se ha ingresado un valor válido para la paginación');
            }
        }

        // Ordenar por fecha descendente (últimos primero)
        query.sort({ fecha: -1 });

        // Ejecutar la consulta
        query.exec()
            .then((result) => {
                return res.status(200).json({
                    status: 'Success',
                    contador: result.length,
                    articulo: result
                });
            })
            .catch((err) => {
                return res.status(400).json({
                    status: 'Failed',
                    mensaje: 'No se logró mostrar los resultados'
                });
            });
    } catch (error) {
        return res.status(400).json({
            status: 'Error',
            mensaje: error.message
        });
    }
};

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

const crear = (req, res) => {
    try {
        let parametros = req.body;

        // Validar los datos
        ValidarDatos(parametros);

        // Agregar la ruta de la imagen a los parámetros
        if (req.file) {
            parametros.imagen = req.file.path;
        }

        // Crear el nuevo artículo
        const art = new ropa(parametros);

        art.save()
            .then((result) => {
                return res.status(200).json({
                    status: 'Success',
                    articulo: result,
                    mensaje: 'Se ha guardado con éxito'
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    status: 'Failed',
                    mensaje: 'No se logró guardar el artículo'
                });
            });
    } catch (error) {
        return res.status(400).json({
            status: 'Failed',
            mensaje: error.message
        });
    }
};

module.exports = {
    consultar,
    borrar,
    buscarUno,
    crear
}