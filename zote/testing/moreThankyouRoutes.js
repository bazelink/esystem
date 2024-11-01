const express = require('express');
const { moreThankyouMessage } = require('./moreThankyouController');
const router = express.Router();

router.post('/morethankyou', moreThankyouMessage);

module.exports = router;
