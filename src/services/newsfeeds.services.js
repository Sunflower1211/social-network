const _newsfeeds = require('../models/newsfeeds.model')
const _user = require('../models/user.model')
const { ObjectId } = require('mongodb')

const PutNewsFeeds = async ({
    userid,
    insertPosts
}) => {
    try {
        const followers = await _user.findOne({ _id: userid }, { followers: 1 })
        if (followers.followers.length > 0) {
            for (const item of followers.followers) {
                await _newsfeeds.create({
                    userid: item,
                    posts: insertPosts
                })
            }
            return
        }
        return
    } catch (error) {
        console.log(error)
    }
}

const DeleteNewsFeeds = async ({
    id
}) => {
    try {
        const objectId = new ObjectId(id)
        await _newsfeeds.deleteMany({ 'posts._id': objectId })
    } catch (error) {
        console.log(error)
    }
}

const UpdateNewsFeeds = async ({
    id,
    content
}) => {
    try {
        const objectId = new ObjectId(id)
        await _newsfeeds.updateMany({ 'posts._id': objectId }, { 'posts.content': content })

    } catch (error) {
        console.log(error)
    }
}

const ListNewsFeeds = async ({
    userid
}) => {
    try {
        const newsfeeds = await _newsfeeds.find({ userid: userid, status: false }).sort({ createdAt: -1 }).limit(10)
        if (!newsfeeds) {
            return {
                statusCode: 404,
                message: `Not Found newsfeeds`
            }
        }

        for (const item of newsfeeds) {
            await _newsfeeds.updateOne({ _id: item._id }, { status: true })
        }

        return {
            statusCode: 200,
            message: 'success newsfeeds',
            data: newsfeeds
        }
    } catch (error) {
        return {
            error: error
        }
    }
}

module.exports = {
    PutNewsFeeds,
    DeleteNewsFeeds,
    UpdateNewsFeeds,
    ListNewsFeeds
}