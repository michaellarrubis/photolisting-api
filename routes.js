const express = require('express')
const router = express.Router()

router.use('/photos', require('./controllers/v1/photoController'))

module.exports = router