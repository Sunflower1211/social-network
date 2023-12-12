//xử lý theo dõi của những người dùng với nhau

const {
    InsertFollow,
    DeleteFollow,
    ListFollowing,
    ListFollowers
} = require('../services/follow.services')

class Follow {
    //tạo thêm theo dõi
    async InsertFollow(req, res, next) {
        const userId = req.user._id
        const userFollowId = req.params.userFollowId

        const {
            statusCode,
            message,
            error
        } = await InsertFollow({ userId, userFollowId })
        if (error) {
            next(error)
        }

        if (statusCode === 404) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }

    //bỏ theo dõi
    async DeleteFollow(req, res, next) {
        const userId = req.user._id
        const userFollowId = req.params.userFollowId

        const {
            statusCode,
            message,
            error
        } = await DeleteFollow({ userId, userFollowId })
        if (error) {
            next(error)
        }

        if (statusCode === 404) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }

    //những người user theo dõi
    async ListFollowing(req, res, next) {
        const userId = req.user._id
        const {
            statusCode,
            message,
            data,
            error
        } = await ListFollowing({ userId })

        if (error) {
            next(error)
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

    //những người theo dõi user
    async ListFollowers(req, res, next) {
        const userId = req.user._id
        const {
            statusCode,
            message,
            data,
            error
        } = await ListFollowers({ userId })

        if (error) {
            next(error)
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

module.exports = new Follow()