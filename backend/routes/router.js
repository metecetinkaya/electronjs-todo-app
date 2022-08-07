const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller');

router.get('/', Controller.items_get);
router.post('/', Controller.item_create);
router.put('/', Controller.item_update);
router.delete('/', Controller.item_delete);

module.exports = router;