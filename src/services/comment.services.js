const _comment = require('../models/comment.model')
const _posts = require('../models/posts.model')

const {
    InsertNotify,
    DeleteNotifyComment
} = require('../services/notify.services')
const { ObjectId } = require('mongodb');

const InserComment = async ({
    userId,
    userName,
    postsId,
    contentComment,
    userAvatar
}) => {
    try {

        const posts = await _posts.findOne({ _id: postsId })

        if (!posts) {
            return {
                statusCode: 404,
                message: `Not Found: postsId ${postsId}`
            }
        }

        const inserComment = await _comment.create({
            postsid: postsId,
            userid: userId,
            username: userName,
            content: contentComment,
            useravtar: userAvatar
        })

        if (!inserComment) {
            return {
                statusCode: 400,
                message: 'more failure'
            }
        }

        const data = {
            commentId: inserComment._id,
            postsId: posts._id,
            userIdComment: userId,
            userNameComment: userName,
            content: contentComment
        }

        InsertNotify({
            recipientId: posts.userid,
            notificationtype: "New Comment",
            data: data
        })

        return {
            statusCode: 201,
            message: 'more success',
            data: inserComment
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

const DeleteComment = async ({
    userId,
    commentId
}) => {
    try {
        const comment = await _comment.findOne({ _id: commentId })

        if (!comment) {
            return {
                statusCode: 404,
                message: `Not Found: ID ${commentId}`
            }
        }

        if (userId.toString() != comment.userid.toString()) {

            return {
                statusCode: 403,
                message: `You are not the creator of the comment`
            }
        }

        await _comment.deleteOne({ _id: commentId })
        DeleteNotifyComment({ commentId })

        return {
            statusCode: 200,
            message: `success delete comment ${comment.content}`
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

const ListComment = async ({
    postsId
}) => {
    try {
        const listComment = await _comment.find({ postsid: postsId }, { replies: 0 })
        if (!listComment) {
            return {
                statusCode: 404,
                message: `Not Found: ${postsId}`
            }
        }

        return {
            statusCode: 200,
            message: 'success list comment',
            data: listComment
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

module.exports = {
    InserComment,
    DeleteComment,
    ListComment
}