const express = require('express');

const {ctrlWrapper} = require('../../helpers/ctrlWrapper');

const {validationBody} = require('../../middlewares/validationBody');

const ctrl = require('../../controllers/auth');

const {schemas} = require('../../models/user')

const router = express.Router();


router.post('/register', validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

module.exports = router;