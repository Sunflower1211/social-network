const _user = require('../models/user.model')

const InsertFollow = async ({
    userId,
    userFollowId
}) => {
    try {
        const checkFollowing = await _user.findOne({ _id: userId })
        const checkFollowers = await _user.findOne({ _id: userFollowId })

        if (checkFollowing.following.includes(userFollowId)) {
            return {
                statusCode: 403,
                message: `Forbidden: you are already following ${userFollowId}`
            }
        }
        if (checkFollowers.followers.includes(userId)) {
            return {
                statusCode: 403,
                message: `Forbidden: This ${userFollowId} is already tracking you`
            }
        }

        await _user.updateOne({ _id: userId }, { $push: { following: userFollowId } })
        await _user.updateOne({ _id: userFollowId }, { $push: { followers: userId } })

        return {
            statusCode: 201,
            message: 'success insert follow'
        }

    } catch (error) {
        return {
            error: error
        }
    }
}

const DeleteFollow = async ({
    userId,
    userFollowId
}) => {
    try {
        const checkFollowing = await _user.findOne({ _id: userId })
        const checkFollowers = await _user.findOne({ _id: userFollowId })

        if (checkFollowers && checkFollowing) {
            await _user.updateOne({ _id: userId }, { $pull: { following: userFollowId } })
            await _user.updateOne({ _id: userFollowId }, { $pull: { followers: userId } })

            return {
                statusCode: 200,
                message: 'success delete follow'
            }
        }

        return {
            statusCode: 404,
            message: 'Not Found'
        }

    } catch (error) {
        return {
            error: error
        }
    }
}

//danh những người mà người dùng hiện tại đang theo dõi
const ListFollowing = async ({
    userId
}) => {
    try {
        const listFollowing = await _user.findOne({ _id: userId }, { _id: 0, following: 1 })
        if (!listFollowing) {
            return {
                statusCode: 404,
                message: `Not Found: id ${userId} not found`
            }
        }

        return {
            statusCode: 200,
            message: 'success list following',
            data: listFollowing
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

//danh những người theo dõi người dùng hiện tại
const ListFollowers = async ({
    userId
}) => {
    try {
        const listFollowers = await _user.findOne({ _id: userId }, { _id: 0, followers: 1 })
        if (!listFollowers) {
            return {
                statusCode: 404,
                message: `Not Found: id ${userId} not found`
            }
        }

        return {
            statusCode: 200,
            message: 'success list following',
            data: listFollowers
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

module.exports = {
    InsertFollow,
    DeleteFollow,
    ListFollowing,
    ListFollowers
}