//xử lý thông báo các bài viết mới, comment mới, ...

const {
    ListNotify
} = require('../services/notify.services')

class Notify {
    //danh sách thông báo ví dụ: có người like bài viết của user, ...
    async ListNotify(req, res, next) {
        const userId = req.user._id
        const {
            statusCode,
            message,
            data,
            error
        } = await ListNotify({ userId })
        if (error) {
            return next(error)
        }
        return res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            data: data
        })
    }
}

module.exports = new Notify
