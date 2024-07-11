const express = require("express");
const ropaController = require('../controller/ropaController');
const usuarioController = require('../controller/loginController');
const multer = require('multer');
const path = require('path');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/')); // Utiliza path.join para asegurar la ruta absoluta
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/ropa/:numero?', ropaController.consultar);
router.delete('/ropa/:id', ropaController.borrar);
router.get('/ropa/detalle/:id', ropaController.buscarUno); 
router.post('/agregar',upload.single('imagen'), ropaController.crear);

router.post('/register', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;
