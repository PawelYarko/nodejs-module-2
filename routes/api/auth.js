const express = require('express');

const ctrl = require('../../controllers/auth');

const {ctrlWrapper} = require('../../helpers');

const {authenticate,validationBody} = require('../../middlewares');

const {schemas} = require('../../models/user')

const router = express.Router();

router.post('/register', validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;