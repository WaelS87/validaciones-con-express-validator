const {check , body} = require('express-validator');
const users = require('../data/usersModule').loadUsers();

module.exports=[
    check('name')
        .notEmpty().withMessage('Debe Entrar Tu Nombre Por Favor....').bail()
        .isAlpha().withMessage('Por Favor ingrése Tu Nombre Bien').bail()
        .isLength({min:3}).withMessage('Por Favor ingrése Tu Nombre Bien'),

    check('lastname')
        .notEmpty().withMessage('Debe Entrar Tu Apellido Por Favor....').bail()
        .isAlpha().withMessage('Por Favor ingrése Tu Apellido Bien').bail()
        .isLength({min:3}).withMessage('Por Favor ingrése Tu Apellido Bien'),

    body('email').toLowerCase()
        .notEmpty().withMessage('Debe Entrar Tu mail').bail()
        .isEmail().withMessage('Email no es Valido').bail()
        .custom((value,{req})=> {
            let user = users.find(user => user.Email === value.trim())
            if(user){
                return false
            }else{
                return true
            }
       }).withMessage('el mail ya esta registrado'),
    check('password')
        .notEmpty().withMessage('por favor Entre Tu Contraseña').bail()
        .isLength({min:6}).withMessage('la contraseña minmo de 6 caracteres').bail(),

    ]   