'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get the user list');
});

module.exports = router;
