const _home = require('../models/home.model')
const _user = require('../models/user.model')
const { ObjectId } = require('mongodb')


const PutHome = async ({
    insertPosts
}) => {
    try {
        const user = await _user.find()
        for (const item of user) {
            await _home.create({
                userid: item._id,
                posts: insertPosts
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const DeleteHome = async ({
    id
}) => {
    try {
        const objectId = new ObjectId(id)
        await _home.deleteMany({ 'posts._id': objectId })
    } catch (error) {
        console.log(error)
    }
}

const UpdateHome = async ({
    id,
    content
}) => {
    try {
        const objectId = new ObjectId(id)
        await _home.updateMany({ 'posts._id': objectId }, { 'posts.content': content })
    } catch (error) {
        console.log(error)
    }
}

const ListHome = async ({
    userid
}) => {
    try {
        const home = await _home.find({ userid: userid, status: false }, { posts: 1 }).sort({ createdAt: -1 }).limit(10)
        if (!home) {
            return {
                statusCode: 404,
                message: `Not Found newsfeeds`
            }
        }

        for (const item of home) {
            await _home.updateOne({ _id: item._id }, { status: true })
        }

        return {
            statusCode: 200,
            message: 'success newsfeeds',
            data: home
        }
    } catch (error) {
        return {
            error: error
        }
    }
}


module.exports = {
    PutHome,
    DeleteHome,
    UpdateHome,
    ListHome
}