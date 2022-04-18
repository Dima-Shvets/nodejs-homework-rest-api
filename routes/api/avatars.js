const express = require('express');

const router = express.Router();
const path = require('path');

// const FILE_DIR = path.resolve("./public");

router.get('/download', express.static(process.env.STATIC_FOLDER));

module.exports = router