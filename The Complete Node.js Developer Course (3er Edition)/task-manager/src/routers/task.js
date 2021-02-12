const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const Task = require('../models/task')

// POST for creating a new task
router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body, 
        owner: req.user._id
    }) 

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET for getting a list of tasks
router.get('/tasks', auth, async (req, res) => {
    const _user = req.user

    try {
        // const tasks = await Task.find({ owner: _user._id })
        // res.send(tasks)

        await _user.populate('tasks').execPopulate()
        res.send(_user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

// GET for getting a single task using dynamic link
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const _user = req.user

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: _user._id });

        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//PATCH for updating the task and validate that everything is correct
router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    
    const _id = req.params.id
    const _body = req.body
    const updates = Object.keys(_body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!'})
    }

    const _user = req.user

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: _user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = _body[update])
        await task.save()

        // Este tipo de update no pasa por el schema de save
        // const task = await Task.findByIdAndUpdate(
        //     _id, 
        //     _body,
        //     { new: true, runValidators: true })

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//DELETE for deleting a task from database
router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const _user = req.user

    try {
        //const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOneAndDelete({ _id, owner: _user._id})

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router