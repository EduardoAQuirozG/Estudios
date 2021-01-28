const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// POST for creating a new task
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET for getting a list of tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

// GET for getting a single task using dynamic link
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//PATCH for updating the task and validate that everything is correct
router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    
    const _id = req.params.id
    const _body = req.body
    const updates = Object.keys(_body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid update!'})
    }
    try {
        const task = await Task.findByIdAndUpdate(
            _id, 
            _body,
            { new: true, runValidators: true })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

//DELETE for deleting a task from database
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)

        if(!task) {
            res.status(404).send()
        }

        res.send(task)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router