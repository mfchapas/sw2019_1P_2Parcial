var express = require('express');
var router = express.Router();

var usersApi = require('./api/employee');
var thingsApi = require('./api/employeeModel');

router.use('/employee', employeeApi);
router.use('/employeeModel', employeeModelApi);

module.exports = router;
