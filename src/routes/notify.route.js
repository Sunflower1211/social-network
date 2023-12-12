const express = require('express')
const routes = express.Router();
const notify = require('../controllers/notify.controller')


routes.get('/listNotify', notify.ListNotify)

module.exports = routes