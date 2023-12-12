const express = require('express')
const routes = express.Router();
const comment = require('../controllers/comment.controller')


routes.post('/insertComment/:postsId', comment.InserComment)
routes.delete('/deleteComment/:commentId', comment.DeleteComment)
routes.get('/listComment/:postsId', comment.ListComment)

module.exports = routes