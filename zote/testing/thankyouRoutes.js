const express = require('express');
const { thankyouMessage } = require('./thankyouController');
const router = express.Router();

router.post('/thankyou', thankyouMessage);

module.exports = router;
