const router = require('express').Router()

module.exports = router

router.use('/search', require('./search'))
