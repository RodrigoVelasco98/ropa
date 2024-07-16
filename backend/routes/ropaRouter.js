const express = require("express");
const ropaController = require('../controller/ropaController');
const usuarioController = require('../controller/loginController');
const multer = require('multer');
const path = require('path');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); 
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
