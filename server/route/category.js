const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');

router.post('/addCategory', categoryController.addCategory)
router.get('/allCategory', categoryController.allCategory)

module.exports = router;
