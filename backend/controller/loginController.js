const bcrypt = require('bcrypt');
const Usuario = require('../models/loginModel');

const registrar = (req, res) => {
    const { usuario, password, registrationPassword } = req.body;

    const fixedRegistrationPassword = 'ropa123';

    if (registrationPassword !== fixedRegistrationPassword) {
        return res.status(403).json({
            status: 'Failed',
            mensaje: 'Contraseña de registro incorrecta'
        });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({
                status: 'Error',
                mensaje: 'Error al encriptar la contraseña',
                error: err
            });
        }

        let nuevoUsuario = new Usuario({
            usuario,
            password: hashedPassword,
        });

        nuevoUsuario.save()
        .then((result) => {
            return res.status(200).json({
                status: 'Success',
                usuario: result,
                mensaje: 'Usuario registrado exitosamente'
            });
        }).catch((err) => {
            return res.status(400).json({
                status: 'Failed',
                mensaje: 'No se logró registrar el usuario',
                error: err
            });
        });
    });
};

const login = (req, res) => {
    const { usuario, password } = req.body;

    Usuario.findOne({ usuario })
    .then((usuario) => {
        if (!usuario) {
            return res.status(400).json({
                status: 'Failed',
                mensaje: 'Credenciales incorrectas'
            });
        }

        bcrypt.compare(password, usuario.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({
                    status: 'Error',
                    mensaje: 'Ocurrió un error durante el login',
                    error: err
                });
            }

            if (isMatch) {
                return res.status(200).json({
                    status: 'Success',
                    mensaje: 'Login exitoso',
                    usuario: usuario
                });
            } else {
                return res.status(400).json({
                    status: 'Failed',
                    mensaje: 'Credenciales incorrectas'
                });
            }
        });
    }).catch((err) => {
        return res.status(500).json({
            status: 'Error',
            mensaje: 'Ocurrió un error durante el login',
            error: err
        });
    });
};

module.exports = {
    registrar,
    login
};
