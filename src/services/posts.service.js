const _posts = require('../models/posts.model')
const _user = require('../models/user.model')
const {
    PutNewsFeeds,
    DeleteNewsFeeds,
    UpdateNewsFeeds
} = require('./newsfeeds.services')

const {
    PutHome,
    DeleteHome,
    UpdateHome
} = require('./home.services')

const {
    InsertNotify,
    UpadteNotifyPosts,
    DeleteNotifyPosts
} = require('../services/notify.services')

const InsertPosts = async ({
    userid,
    username,
    content,
    image
}) => {
    try {
        const insertPosts = await _posts.create({
            userid: userid,
            username: username,
            content: content,
            image: image
        })
        if (!insertPosts) {
            return {
                statusCode: 400,
                message: 'Insert posts fail'
            }
        }

        const followers = await _user.findOne({ _id: userid }, { _id: 0, followers: 1 })


        const data = {
            posterid: insertPosts.id,
            poster: username,
            content: content
        }

        if (followers.followers.length >= 0) {
            followers.followers.forEach((item) => {
                InsertNotify({
                    recipientId: item,
                    notificationtype: 'New Posts',
                    data: data
                })
            })
        }
        PutNewsFeeds({
            userid,
            insertPosts
        })
        PutHome({
            userid,
            insertPosts
        })

        return {
            statusCode: 201,
            message: 'success insert posts',
            data: insertPosts
        }
    } catch (error) {
        return { error: error }
    }
}

const DeletePosts = async ({
    id
}) => {
    try {
        const deletePosts = await _posts.deleteOne({ _id: id })
        if (!deletePosts.deletedCount) {
            return {
                statusCode: 404,
                message: `Not Found ${id}`
            }
        }
        DeleteNewsFeeds({ id })
        DeleteHome({ id })
        DeleteNotifyPosts({ id })
        return {
            statusCode: 200,
            message: 'success delete posts'
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

//hiển thị thông tin của bài posts cho người dùng cập nhật
const UpdatePostsInfo = async ({
    id
}) => {
    try {
        const postsInfo = await _posts.findOne({ _id: id }, { content: 1, image: 1 })
        if (!postsInfo) {
            return {
                statusCode: 404,
                message: `Not Found ${id}`
            }
        }
        return {
            statusCode: 200,
            message: 'success posts info',
            data: postsInfo
        }
    } catch (error) {
        return { error: error }
    }
}

const UpdatePosts = async ({
    id,
    content
}) => {
    try {
        const updatePost = await _posts.updateOne({ _id: id }, { content: content })
        if (!updatePost) {
            return {
                statusCode: 404,
                message: `Not Found ${id}`
            }
        }
        UpdateNewsFeeds({ id, content })
        UpdateHome({ id, content })
        UpadteNotifyPosts({ id, content })
        return {
            statusCode: 200,
            message: 'success update posts',
        }
    } catch (error) {
        return { error: error }
    }
}

const InfoPosts = async ({
    postsId
}) => {
    try {
        const posts = await _posts.findOne({ _id: postsId })
        if (!posts) {
            return {
                statusCode: 404,
                message: `Not Found: postId ${postsId}`
            }
        }

        return {
            statusCode: 200,
            message: 'success posts',
            data: posts
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

module.exports = {
    InsertPosts,
    DeletePosts,
    UpdatePostsInfo,
    UpdatePosts,
    InfoPosts
}