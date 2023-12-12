//xử lý các bài viết

const {
    InsertPosts,
    DeletePosts,
    UpdatePostsInfo,
    UpdatePosts,
    InfoPosts
} = require('../services/posts.service')

class Posts {

    //tạo bài viết mới
    async InsertPosts(req, res, next) {
        const {
            content,
            image
        } = req.body

        const userid = req.user._id
        const username = req.user.fullname

        const {
            statusCode,
            message,
            data,
            error
        } = await InsertPosts({ userid, username, content, image })

        if (error) {
            return next(error)
        }

        if (!data) {
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

    async DeletePosts(req, res, next) {
        const id = req.params.id
        const {
            statusCode,
            message,
            error
        } = await DeletePosts({ id })
        if (error) {
            return next(error)
        }

        if (statusCode != 200) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }

        return res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }

    async UpdatePostsInfo(req, res, next) {
        const id = req.params.id
        const {
            statusCode,
            message,
            data,
            error
        } = await UpdatePostsInfo({ id })
        if (error) {
            return next(error)
        }
        if (statusCode != 200) {
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

    async UpdatePosts(req, res, next) {
        const id = req.params.id
        const {
            content
        } = req.body
        const {
            statusCode,
            message,
            error
        } = await UpdatePosts({ id, content })
        if (error) {
            return next(error)
        }
        if (statusCode != 200) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }
        return res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }

    async InfoPosts(req, res, next) {
        const postsId = req.params.postsId

        const {
            statusCode,
            message,
            data,
            error
        } = await InfoPosts({ postsId })

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
            message: message,
            data: data
        })

    }
}

module.exports = new Posts()