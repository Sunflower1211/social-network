const _user = require('../models/user.model')
const _registerUser = require('../models/registerUser.model')


const duplications = async ({
    account,
    email,
    fullname,
}) => {
    try {
        const accountUser = await _user.findOne({ account: account })
        const emailUser = await _user.findOne({ email: email })
        const fullnameUser = await _user.findOne({ fullname: fullname })

        if (accountUser) {
            return {
                statusCode: 400,
                message: "Accout have to unique"
            }
        }
        if (emailUser) {
            return {
                statusCode: 400,
                message: "Email have to unique"
            }
        }
        if (fullnameUser) {
            return {
                statusCode: 400,
                message: "Fullname have to unique"
            }
        }

        return {
            statusCode: null,
            message: null
        }

    } catch (error) {
        consolog.log(error)
    }
}

const insertRegisterUser = async ({
    account,
    password,
    email,
    fullname,
    avatar,
    sex
}) => {
    try {
        const insertRegisterUser = await _registerUser.create({
            account: account,
            password: password,
            email: email,
            fullname: fullname,
            avatar: avatar,
            sex: sex
        })
        return insertRegisterUser
    } catch (error) {
        console.log(error)
    }
}

const insertUser = async ({
    email
}) => {
    const registerUser = await _registerUser.find({ email: email })
    const lastRegisterUser = registerUser[registerUser.length - 1]
    await _user.create({
        account: lastRegisterUser.account,
        password: lastRegisterUser.password,
        email: lastRegisterUser.email,
        sex: lastRegisterUser.sex,
        fullname: lastRegisterUser.fullname,
        avatar: lastRegisterUser.avatar
    })

    await _registerUser.deleteMany({ email: email })


    return {
        statusCodeUser: 201,
        messageUser: 'success insert user'
    }
}

module.exports = {
    duplications,
    insertUser,
    insertRegisterUser
}

