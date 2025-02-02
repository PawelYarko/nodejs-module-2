const express = require('express');

const ctrl = require('../../controllers/contacts/index');

const {ctrlWrapper} = require('../../helpers');

const {authenticate, validationBody, isValidId} = require('../../middlewares');


const router = express.Router();

const { schemas } = require('../../models/contacts');


router.get('/', authenticate, ctrlWrapper(ctrl.listContacts));

router.get('/:id', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', authenticate, validationBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:id', validationBody(schemas.addSchema), isValidId,  ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', validationBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
