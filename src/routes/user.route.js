const express = require('express')
const routes = express.Router();
const user = require('../controllers/user.controller')

routes.get('/listPostOfUser', user.ListPostOfUser)
routes.get('/infoUser', user.InfoUser)
routes.patch('/updateAvatar', user.UpdateAvatar)
routes.patch('/updateName', user.UpdateName)
routes.patch('/updatePassword', user.UpdatePassword)

module.exports = routes