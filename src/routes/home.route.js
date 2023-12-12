const express = require('express')
const routes = express.Router();
const home = require('../controllers/home.controller')


routes.get('/newsFeeds', home.ListNewsFeeds)
routes.get('/foryou', home.ListHome)

module.exports = routes