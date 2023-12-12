const express = require('express')
const routes = express.Router();
const replie = require('../controllers/replies.controller')


routes.post('/insertReplie/:commentId', replie.InsertReplie)
routes.delete('/deleteReplie/:commentId/:repliesId', replie.DeleteReplie)
routes.get('/listReplie/:commentId', replie.ListReplie)

module.exports = routes