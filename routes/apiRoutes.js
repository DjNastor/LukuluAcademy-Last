const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Define routes
router.get('/example', apiController.getExample);

module.exports = router;
