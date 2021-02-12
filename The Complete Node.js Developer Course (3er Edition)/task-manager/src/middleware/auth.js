const jwt = require('jsonwebtoken')
const User = require('../models/user')


// Without middleware: new request -> run route handler
// With middleware: new request -> do something -> run route handler
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.status(400).send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('The server is under maintenance.')
// })

//We check the authorization to validate that the token is correct and exists
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }
    catch (error) {
        res.status(401).send( { error: 'Please authenticate.' })
    }
}

module.exports = auth;