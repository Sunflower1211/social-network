//xử lý liên quan đến việc nhắn tin

const {
    ReceiverName,
    GroupName,
    InsertGroup,
    InsertMemberGroup,
    ExpelMembers,
    LeaveGroup,
    Promote,
    ListMemberGroup,
    ListAddGroupMember
} = require('../services/message.services')

class Message {
    //nhắn tin riêng
    async MessagePrivate(req, res, next) {
        const id = req.params.id
        //chú ý kết thúc để lại
        // const sendername = req.user.fullname
        const sendername = 'Luong'
        const {
            statusCode,
            message,
            data,
            error
        } = await ReceiverName({ id })
        if (error) {
            return next(error)
        }
        if (!data) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }
        return res.render('message', { sendername: sendername, receivername: data })
    }

    //nhắn tin nhóm
    async MessageGroup(req, res, next) {
        const id = req.params.id
        //chú ý kết thúc để lại
        // const sendername = req.user.fullname
        const sendername = 'Luong'
        const {
            statusCode,
            message,
            data,
            error
        } = await GroupName({ id })
        if (error) {
            return next(error)
        }
        if (!data) {
            const error = new Error(message)
            error.statusCode = statusCode
            return next(error)
        }
        return res.render('messageGroup', { sendername: sendername, groupname: data })
    }

    //tạo nhóm
    async InsertGroup(req, res, next) {
        const groupname = req.body.groupname
        const username = req.user.fullname
        const userid = req.user.id

        const {
            statusCode,
            message,
            error
        } = await InsertGroup({ groupname, username, userid })
        if (error) {
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }

    //danh sách thành viên nhóm
    async ListMemberGroup(req, res, next) {
        const groupid = req.params.id

        const {
            statusCode,
            message,
            data,
            error
        } = await ListMemberGroup({ groupid })

        if (error) {
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            data: data
        })
    }

    //dach sách những người bạn theo hiển thị ra để chọn thêm vào nhóm
    async ListAddGroupMember(req, res, next) {
        const userid = req.user.id
        const groupid = req.params.id

        const {
            statusCode,
            message,
            data,
            error
        } = await ListAddGroupMember({ userid })

        if (error) {
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            groupid: groupid,
            data: data
        })

    }

    //thêm thành viên vào nhóm
    async InsertMemberGroup(req, res, next) {
        //username người dùng hiện tại
        const userName = req.user.fullname
        //username người được thêm vào nhóm
        const username = req.body.username
        const groupid = req.params.id

        const {
            statusCode,
            message,
            error
        } = await InsertMemberGroup({ userName, username, groupid })

        if (error) {
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }

    //kích thành viên khỏi nhóm
    async ExpelMembers(req, res, next) {
        //username người dùng hiện tại
        const userName = req.user.fullname
        //username người bị đuổi khỏi nhóm
        const username = req.body.username
        const groupid = req.params.id

        const {
            statusCode,
            message,
            error
        } = await ExpelMembers({ userName, username, groupid })

        if (error) {
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }

    //rời nhóm
    async LeaveGroup(req, res, next) {
        const username = req.user.fullname
        const groupid = req.params.id
        const {
            statusCode,
            message,
            error
        } = await LeaveGroup({ username, groupid })

        if (error) {
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }

    //thăng chức quản trị viên
    async Promote(req, res, next) {
        //username người dùng hiện tại
        const userName = req.user.fullname
        //username người bị đuổi khỏi nhóm
        const username = req.body.username
        const groupid = req.params.id

        const {
            statusCode,
            message,
            error
        } = await Promote({ userName, username, groupid })

        if (error) {
            return next(error)
        }

        res.status(statusCode).json({
            statusCode: statusCode,
            message: message
        })
    }
}

module.exports = new Message