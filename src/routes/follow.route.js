const express = require('express')
const routes = express.Router()
const follow = require('../controllers/follow.controller')


routes.post('/insertFollow/:userFollowId', follow.InsertFollow)
routes.delete('/deleteFollow/:userFollowId', follow.DeleteFollow)
routes.get('/listFollowing', follow.ListFollowing)
routes.get('/listFollowers', follow.ListFollowers)


module.exports = routes