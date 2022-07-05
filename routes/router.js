const express = require('express');
const router = express.Router();

const items_controller = require('../controllers/controller');

router.get('/', items_controller.items_get);
router.get('/:id', items_controller.item_get);
router.post('/create', items_controller.item_create);
router.put('/:id', items_controller.item_update);
router.delete('/:id', items_controller.item_delete);

module.exports = router;