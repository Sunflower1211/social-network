const express = require('express')
const routes = express.Router();
const posts = require('../controllers/posts.controller')

routes.post('/insertPosts', posts.InsertPosts)
routes.get('/updatePostsInfo/:id', posts.UpdatePostsInfo)
routes.put('/updatePosts/:id', posts.UpdatePosts)
routes.delete('/deletePosts/:id', posts.DeletePosts)
routes.get('/infoPosts/:postsId', posts.InfoPosts)

module.exports = routes