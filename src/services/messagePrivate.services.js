const _user = require('../models/user.model')
const _messagePrivate = require('../models/messagePrivate.model')


const ConnectionPrivate = (socket) => {

    //cập nhật dữ liệu trong mongodb trường socketid và isonline
    socket.on('user connection', async (sendername) => {
        await _user.updateOne({ fullname: sendername }, { socketid: socket.id })
    })

    //hiển thị ra tin nhắn cũ với đối tượng nhận tin nhắn
    socket.on('show message', async (sendername, receivername) => {
        const messagePrivate = await _messagePrivate.find({
            $or: [
                { sendername: sendername, receivername: receivername },
                { sendername: receivername, receivername: sendername },
            ]
        }).sort({ createdAt: 1 })
        _io.emit('show message', messagePrivate)
    })

    //nhắn tin
    socket.on('chat message', async (sendername, receivername, content) => {
        await _messagePrivate.create({
            sendername,
            receivername,
            content
        })
        _io.emit('chat message', content, sendername)
    })
}


module.exports = { ConnectionPrivate }