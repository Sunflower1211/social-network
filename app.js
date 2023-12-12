const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const app = express()
require("express-async-errors")
const session = require('express-session')
const passport = require('passport')
require('dotenv').config()

//socket.io
const { ConnectionPrivate } = require('./src/services/messagePrivate.services')
const { ConnectionGroup } = require('./src/services/messageGroup.services')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const server = createServer(app)
const io = new Server(server)
global._io = io

const store = session.MemoryStore()


app.use(session({
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 100 * 100 },
    store
}))

app.use(passport.initialize())
app.use(passport.session())

require('./src/config/mongodb').connect()
helmet.contentSecurityPolicy({
    directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"],
        // Other CSP directives as needed
    },
})
app.use(morgan('tiny'))
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'))


app.use((req, res, next) => {
    if (req.url === '/favicon.ico') {
        res.status(204).end();
    } else {
        next();
    }
});

app.use(require('./src/routes/index'))

global._io.on('connection', (socket) => {
    console.log('connect')
    ConnectionPrivate(socket)
    ConnectionGroup(socket)
    socket.on('disconnect', async () => {
        console.log('disconnect')
    })
})


module.exports = server