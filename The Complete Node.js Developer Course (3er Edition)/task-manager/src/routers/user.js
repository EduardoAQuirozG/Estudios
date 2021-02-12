const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')

// POST for creating a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
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
        res.status(400).send(error)
    }
})

// POST for login out and removing the token
router.post('/users/logout', auth, async (req, res) => {
    try {
        const _user = req.user 
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
    try {
        const _user = req.user
        _user.tokens = [];

        await _user.save();

        res.status(200).send('You have logged out from all sessions correctly.')
    } catch (error) {
        res.status(500).send({ error })
    }
})

// GET for getting a list of users
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// GET for getting a single user using dynamic link
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

//PATCH for updating a single user, validating that everything is correct
router.patch('/users/:id', async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    
    const _id = req.params.id
    const _body = req.body
    const updates = Object.keys(_body)

    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(_id)

        if (!user){
            res.status(404).send()
        }

        updates.forEach((update) => user[update] = _body[update])

        await user.save()

        // Este tipo de update no pasa por el schema de save
        // const user = await User.findByIdAndUpdate(
        //     _id, 
        //     _body, 
        //     { new: true, runValidators: true})

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

//DELETE for deleting information in database
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)

        if (!user) {
            return res.statusCode(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router