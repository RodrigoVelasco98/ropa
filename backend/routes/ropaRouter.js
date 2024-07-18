const express = require("express");
const ropaController = require('../controller/ropaController');
const usuarioController = require('../controller/loginController');
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');

const router = express.Router();


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ropa',
        format: async (req, file) => 'png', // soporta promesas y callbacks
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});

const upload = multer({ storage: storage });

router.get('/ropa/:numero?', ropaController.consultar);
router.delete('/ropa/:id', ropaController.borrar);
router.get('/ropaUnidad/:id', ropaController.buscarUno);
router.get('/ropa/detalle/:id', ropaController.buscarUno); 
router.post('/agregar',upload.single('imagen'), ropaController.crear);

router.post('/register', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;
