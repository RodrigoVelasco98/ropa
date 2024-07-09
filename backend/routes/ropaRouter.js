const express = require("express");
const ropaController = require('../controller/ropaController');
const usuarioController = require('../controller/loginController');

const router = express.Router();

router.get('/ropa/:numero?', ropaController.consultar);
router.delete('/ropa/:id', ropaController.borrar);
router.get('/ropa/detalle/:id', ropaController.buscarUno); 
router.post('/agregar', ropaController.crear);

router.post('/register', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;
