//We load the defined libraries
const express = require('express')
const multer = require('multer') //used to upload documents
const sharp = require('sharp') //used to resize and change the format of an image

//We load personalized libraries
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')

//We load the middleware authentication
const auth = require('../middleware/auth')

//We load the schemas
const User = require('../models/user')

//We load the router
const router = new express.Router()

//We load the file upload configuration
const upload = multer({
    //dest: 'avatar', We use this to assign a place to save, unless you are going to use another point 
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('The file is not an image.'))
        }

        cb(undefined, true)
    }
})

// POST for creating a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send({ error })
    }
})

// POST for creating the login token of the user
router.post('/users/login', async (req, res) => {
    const _body = req.body

    try {
        const user = await User.findByCredentials(_body.email, _body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (error) {
        res.status(400).send({ error })
    }
})

// POST for login out and removing the token
router.post('/users/logout', auth, async (req, res) => {
    const _user = req.user 

    try {
        _user.tokens = _user.tokens.filter(token => {
            return token.token !== req.token
        });

        await _user.save();

        res.status(200).send('You have logged out correctly.')
    } catch (error) {
        res.status(500).send({ error })
    }
})

// POST for login out all the users with there own tokens
router.post('/users/logoutAll', auth, async (req, res) => {
    const _user = req.user

    try {
        _user.tokens = [];

        await _user.save();

        res.status(200).send(_user)
    } catch (error) {
        res.status(500).send({ error })
    }
})

// GET for getting a list of users
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// GET for getting a single user using dynamic link
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

//PATCH for updating a single user, validating that everything is correct
router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    
    const _body = req.body
    const updates = Object.keys(_body)

    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    const _user = req.user

    try {
        // const user = await User.findById(_id)

        // if (!user){
        //     return res.status(404).send()
        // }
        
        updates.forEach((update) => _user[update] = _body[update])

        await _user.save()

        // Este tipo de update no pasa por el schema de save
        // const user = await User.findByIdAndUpdate(
        //     _id, 
        //     _body, 
        //     { new: true, runValidators: true})

        res.send(_user)
    } catch (error) {
        res.status(500).send({ error })
    }
})

//DELETE for deleting information in database
router.delete('/users/me', auth, async (req, res) => {
    const _user = req.user

    try {
        // const user = await User.findByIdAndDelete(_id)

        // if (!user) {
        //     return res.statusCode(404).send()
        // }

        await _user.remove()
        sendCancelationEmail(_user.email, _user.name)

        res.send(_user)
    } catch (error) {
        res.status(500).send({ error })
    }
})

//POST to upload an avatar from the user
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const _user = req.user;
    const _avatarBuffer = req.file.buffer

    try {
        const buffer = await sharp(_avatarBuffer)
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();

        _user.avatar = buffer
        await _user.save();

        res.send();
    } catch (error) {
        res.status(500).send({ Error: error })
    }
}, (error, req, res, next) => {
    res.status(400).send({ Error: error.message })
})

//DELETE to delete the avatar image from the user
router.delete('/users/me/avatar', auth, async (req, res) => {
    const _user = req.user

    try {
        _user.avatar = undefined
        await _user.save()

        res.send()
    } catch (e) {
        res.status(500).send({ Error: error })
    }
})

//GET to get the user avatar by the id provided
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error('No image was found')
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router