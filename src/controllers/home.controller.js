//xử lý những bản tin người dùng để lướt xem

const {
    ListNewsFeeds
} = require('../services/newsfeeds.services')

const {
    ListHome
} = require('../services/home.services')

class Home {
    //danh sách bản tin những người theo dõi
    async ListNewsFeeds(req, res, next) {
        const userid = req.user._id
        const {
            statusCode,
            message,
            data,
            error
        } = await ListNewsFeeds({ userid })
        if (error) {
            return next(error)
        }

        if (!data && statusCode && message) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }

        return res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            data: data
        })
    }

    //danh sách bản tin của toàn server
    async ListHome(req, res, next) {
        const userid = req.user._id
        const {
            statusCode,
            message,
            data,
            error
        } = await ListHome({ userid })
        if (error) {
            return next(error)
        }

        if (!data && statusCode && message) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }

        return res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            data: data
        })
    }


}

module.exports = new Home()