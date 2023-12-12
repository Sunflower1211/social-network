const _comment = require('../models/comment.model')

const {
    InsertNotify,
    DeleteNotifyReplie
} = require('../services/notify.services')

const InsertReplie = async ({
    userId,
    userName,
    commentId,
    contentReplie,
    userAvatar
}) => {
    try {
        const comment = await _comment.findOne({ _id: commentId })
        if (!comment) {
            return {
                statusCode: 404,
                message: `Not Found: commentId ${commentId}`
            }
        }

        var replieId = 0
        if (comment.replies.length >= 1) {
            replieId = comment.replies[comment.replies.length - 1].ReplieId + 1
        }

        const replie = {
            commentId: comment.id,
            replieId: replieId,
            userId: userId.toString(),
            userName: userName,
            content: contentReplie,
            useravatar: userAvatar
        }

        const insertReplie = await _comment.updateOne({ _id: commentId }, { $push: { replies: replie } })
        if (insertReplie.modifiedCount === 0) {
            return {
                statusCode: 400,
                message: 'Insert replie failed'
            }
        }

        const data = {
            commentId: comment.id,
            replieId: replieId,
            userIdReplie: userId.toString(),
            userNameReplie: userName,
            content: contentReplie
        }

        InsertNotify({
            recipientId: comment.userid,
            notificationtype: "New Replie",
            data: data
        })

        return {
            statusCode: 201,
            message: 'Insert replie success',
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

const DeleteReplie = async ({
    userId,
    replieId,
    commentId
}) => {
    try {
        if (!replieId) {
            return {
                statusCode: 404,
                message: `Not found: replieId ${replieId}`
            }
        }
        const checkComment = await _comment.findOne({ _id: commentId })
        if (!checkComment) {
            return {
                statusCode: 404,
                message: `Not Found: commentId ${commentId}`
            }
        }

        const replieIdNumber = parseInt(replieId, 10)

        const DeleteReplie = await _comment.updateOne({ _id: commentId }, {
            $pull: {
                replies: {
                    userId: userId.toString(),
                    replieId: replieIdNumber
                }
            }
        })

        if (DeleteReplie.modifiedCount === 0) {
            return {
                statusCode: 400,
                message: 'delete replie failed'
            }
        }

        DeleteNotifyReplie({ commentId, replieId })
        return {
            statusCode: 200,
            message: 'Delete replie success'
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

const ListReplie = async ({
    commentId
}) => {
    try {
        const comment = await _comment.findOne({ _id: commentId })
        if (!comment) {
            return {
                statusCode: 404,
                message: `Not Found: commentId ${commentId}`
            }
        }

        return {
            statusCode: 200,
            message: 'success list replie',
            data: comment.replies
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

module.exports = {
    InsertReplie,
    DeleteReplie,
    ListReplie
}