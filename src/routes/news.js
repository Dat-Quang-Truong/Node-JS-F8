const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

// newsController.index, chuyen doi tuong tu ben NewsController.js

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
