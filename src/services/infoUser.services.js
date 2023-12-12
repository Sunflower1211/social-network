const _user = require('../models/user.model')
const _posts = require('../models/posts.model')

const ListPostOfUser = async ({
    userId
}) => {
    try {
        const listPostOfUser = await _posts.find({ userid: userId })
        if (!listPostOfUser) {
            return {
                statusCode: 404,
                message: `Not Found: no id ${userId}`
            }
        }

        return {
            statusCode: 200,
            message: 'success',
            data: listPostOfUser
        }
    } catch (error) {
        return {
            error: error
        }
    }

}

const InfoUser = async ({
    userId
}) => {
    try {
        const infoUser = await _user.findOne({ _id: userId })
        if (!infoUser) {
            return {
                statusCode: 404,
                message: `Not Found: no id ${userId}`
            }
        }

        return {
            statusCode: 200,
            message: 'success',
            data: infoUser
        }

    } catch (error) {
        return {
            error: error
        }
    }
}

const UpdateAvatar = async ({
    userId,
    avatar
}) => {
    try {
        const user = await _user.updateOne({ _id: userId }, { avatar: avatar })
        if (user.modifiedCount = 0) {
            return {
                statusCode: 400,
                message: "update avatar fail"
            }
        }

        return {
            statusCode: 200,
            message: "update avatar success"
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

const UpdateName = async ({
    userId,
    userName
}) => {
    try {
        const user = await _user.updateOne({ _id: userId }, { fullname: userName })
        if (user.modifiedCount = 0) {
            return {
                statusCode: 400,
                message: "update avatar fail"
            }
        }

        return {
            statusCode: 200,
            message: "update avatar success"
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

const UpdatePassword = async ({
    userId,
    password
}) => {
    try {
        const checkPassWord = await _user.findOne({ _id: userId, password: password })
        if (!checkPassWord) {
            return {
                statusCode: 400,
                statusCode: 'Incorrect password'
            }
        }
        const user = await _user.updateOne({ _id: userId }, { password: password })
        if (user.modifiedCount = 0) {
            return {
                statusCode: 400,
                message: "update avatar fail"
            }
        }

        return {
            statusCode: 200,
            message: "update avatar success"
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

const UpdateInfo = async ({

}) => {

}

module.exports = {
    ListPostOfUser,
    InfoUser,
    UpdateAvatar,
    UpdateName,
    UpdatePassword,
    UpdateInfo
}
