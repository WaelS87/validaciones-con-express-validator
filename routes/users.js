var express = require('express');
var router = express.Router();
const {login,register,registerNuevo} = require("../controllers/userController");
const registerValidator = require('../validations/registerValidator');

/* GET users listing. */
router
    .get('/login', login)
    .get('/register', register)
    .post('/register',registerValidator, registerNuevo)

module.exports = router;
