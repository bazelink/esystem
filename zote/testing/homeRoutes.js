const express = require('express');
const { welcomeMessage } = require('./homeController');
const router = express.Router();

router.get('/', welcomeMessage);

module.exports = router;
