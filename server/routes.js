"use strict"
let pjson   = require('../package.json'),
    router  = require('express').Router()

/* GET API info. */
router.get('/', (req, res) => res.end('Welcome to the web API for WebglRocks v' + pjson.version))

/* Not found, for every other route */
router.all('*', (req, res) => res.status(404).json({message: 'Resource not found'}))

module.exports = router