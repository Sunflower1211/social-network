//trang cá nhân của người dùng

const {
    ListPostOfUser,
    InfoUser,
    UpdateAvatar,
    UpdateName,
    UpdatePassword,
    UpdateInfo
} = require('../services/infoUser.services')

class User {
    //danh sách bài viết của người dùng hiện tại
    async ListPostOfUser(req, res, next) {
        const userId = req.user._id
        const {
            statusCode,
            message,
            data,
            error
        } = await ListPostOfUser({ userId })
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

    //thông tin của người dùng
    async InfoUser(req, res, next) {
        const userId = req.user._id
        const {
            statusCode,
            message,
            data,
            error
        } = await InfoUser({ userId })
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

    //đổi hình đại diện mới
    async UpdateAvatar(req, res, next) {
        const userId = req.user._id
        const avatar = req.body.avatar
        const {
            statusCode,
            message,
            error
        } = await UpdateAvatar({ userId, avatar })
        if (error) {
            next(error)
        }

        if (statusCode != 200) {
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

    //đổi tên mới
    async UpdateName(req, res, next) {
        const userId = req.user._id
        const userName = req.body.userName
        const {
            statusCode,
            message,
            error
        } = await UpdateName({ userId, userName })
        if (error) {
            next(error)
        }

        if (statusCode != 200) {
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

    //đổi mật khẩu
    async UpdatePassword(req, res, next) {
        const userId = req.user._id
        const password = req.body.password
        const {
            statusCode,
            message,
            error
        } = await UpdatePassword({ userId, password })
        if (error) {
            next(error)
        }

        if (statusCode != 200) {
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

module.exports = new User