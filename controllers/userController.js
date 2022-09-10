const { validationResult } = require('express-validator');
const { loadUsers, storeUsers } = require('../data/usersModule');
const bcrypt = require('bcryptjs');


module.exports = {
    login: (req, res) => {
        return res.render('login', {
            title: "Ingresar",

        })
    },

    register: (req, res) => {
        return res.render("register", {
            title: "Registro",

        })
    },


    registerNuevo: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            const { name, lastname, email, password } = req.body;
            let users = loadUsers();

            let newUser = {
                id: users.length > 0 ? users[users.length - 1].Id + 1 : 1,
                name: name.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                password: bcrypt.hashSync(password,12)
            }

            let usersModify = [...users, newUser];

            storeUsers(usersModify);

            return res.redirect('login');
        }else{
            return res.render('register', {
                title: 'Registrar',
                errors: errors.mapped(),
               

            })
        }
    },
}