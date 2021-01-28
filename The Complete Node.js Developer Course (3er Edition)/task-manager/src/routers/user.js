const express = require('express')
const router = new express.Router()
const User = require('../models/user')

// POST for creating a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (exception) {
        res.status(400).send(error)
    }
})

// GET for getting a list of users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(400).send(error)
    }
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
        const user = await User.findByIdAndUpdate(
            _id, 
            _body, 
            { new: true, runValidators: true})

        if (!user){
            res.status(404).send()
        }

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