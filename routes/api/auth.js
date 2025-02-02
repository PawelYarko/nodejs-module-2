const express = require('express');

const ctrl = require('../../controllers/auth');

const {ctrlWrapper} = require('../../helpers');

const {authenticate,validationBody,upload} = require('../../middlewares');

const {schemas} = require('../../models/user')

const router = express.Router();

router.post('/register', validationBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrlWrapper(crtl.verifyEmail));

router.post('/verify/', validationBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

router.post('/login', validationBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.patch('/avatars', authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;