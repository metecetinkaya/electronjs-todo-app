const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller');

router.get('/', Controller.items_get);
router.get('/:id', Controller.item_get);
router.post('/create', Controller.item_create);
router.put('/:id', Controller.item_update);
router.delete('/:id', Controller.item_delete);

module.exports = router;