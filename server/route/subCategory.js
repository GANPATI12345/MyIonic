const express = require('express');
const router = express.Router();
const subSategoryController = require('../controller/subCategory');

router.post('/addSubCategory', subSategoryController.addSubCategory)

module.exports = router;