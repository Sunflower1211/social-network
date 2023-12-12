//xử lý liên quan đến comment

const {
    InserComment,
    DeleteComment,
    ListComment
} = require('../services/comment.services')

class Comment {
    //tạo comment mới
    async InserComment(req, res, next) {
        const userId = req.user._id
        const userName = req.user.fullname
        const userAvatar = req.user.avatar
        const postsId = req.params.postsId
        const contentComment = req.body.contentComment

        const {
            statusCode,
            message,
            data,
            error
        } = await InserComment({
            userId,
            userName,
            postsId,
            contentComment,
            userAvatar
        })

        if (error) {
            return next(error)
        }

        if (!data) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            data: data
        })
    }

    //xóa comment
    async DeleteComment(req, res, next) {
        const userId = req.user._id
        const commentId = req.params.commentId

        const {
            statusCode,
            message,
            error
        } = await DeleteComment({
            userId,
            commentId
        })

        if (error) {
            return next(error)
        }

        if (statusCode != 200) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }

    //lấy danh sách comment
    async ListComment(req, res, next) {
        const postsId = req.params.postsId
        const {
            statusCode,
            message,
            data,
            error
        } = await ListComment({ postsId })

        if (error) {
            return next(error)
        }

        if (!data) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            data: data
        })
    }
}

module.exports = new Comment()