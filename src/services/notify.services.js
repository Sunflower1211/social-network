const _notify = require('../models/notify.model')
const { ObjectId } = require('mongodb');

const InsertNotify = async ({
    recipientId,
    notificationtype,
    data
}) => {
    try {
        await _notify.create({
            recipientid: recipientId,
            notificationtype: notificationtype,
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}

const UpadteNotifyPosts = async ({
    id,
    content
}) => {
    try {
        await _notify.updateMany({ 'data.posterid': id }, { 'data.content': content })
    } catch (error) {
        console.log(error)
    }
}

const DeleteNotifyPosts = async ({
    id
}) => {
    try {
        await _notify.deleteMany({ 'data.posterid': id })
    } catch (error) {
        console.log(error)
    }
}

const DeleteNotifyComment = async ({
    commentId
}) => {
    try {
        const objectId = new ObjectId(commentId)
        await _notify.deleteMany({ 'data.commentId': objectId })
    } catch (error) {
        console.log(error)
    }
}

const DeleteNotifyReplie = async ({
    commentId,
    replieId
}) => {
    try {
        const replieIdNumber = parseInt(replieId, 10)
        await _notify.deleteMany({ 'data.commentId': commentId, 'data.replieId': replieIdNumber })
    } catch (error) {
        console.log(error)
    }
}

const ListNotify = async ({
    userId
}) => {
    try {
        const listNotify = await _notify.findOne({ recipientid: userId })
        return {
            statusCode: 200,
            message: 'success list notify',
            data: listNotify
        }
    } catch (error) {
        return {
            error: error
        }
    }
}


module.exports = {
    InsertNotify,
    ListNotify,
    UpadteNotifyPosts,
    DeleteNotifyPosts,
    DeleteNotifyComment,
    DeleteNotifyReplie
}