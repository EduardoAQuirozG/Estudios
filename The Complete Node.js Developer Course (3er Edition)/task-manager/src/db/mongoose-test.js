const { Int32 } = require('mongodb');
const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useCreateIndex: true
});

// We create the model for the user
// const User = mongoose.model('User', {
//     name: {
//         type: String, 
//         required: true, 
//         trim: true
//     }, 
//     age: {
//         type: Number, 
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number.')
//             }
//         }
//     }, 
//     email: {
//         type: String, 
//         required: true, 
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)){
//                 throw new Error('Email is not valid!')
//             }
//         }
//     }, 
//     password: {
//         type: String, 
//         required: true, 
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('The word "password" is included in the password')
//             }
//         }
//     }
// })

// We assign a new User with the model previously created
// const me = new User({
//     name: '   Eduardo    ', 
//     email: 'eduardo@gmail.com    ',
//     password: 'password '
// })

// We save the user information in the mongo database
// me.save().then(() => {
//     console.log(me)
// }).catch(error => {
//     console.log('Error!', error)
// })

// We create the model for the task
const Task = mongoose.model('Task', {
    description: {
        type: String, 
        required: true, 
        trim: true
    }, 
    completed: {
        type: Boolean, 
        default: false
    }
})

// We assign a new Task with the model previously created
const task = new Task({
    description: 'Eat my girlfriend        '
})

// We save the task information in the mongo database
task.save().then(() => {
    console.log(task)
}).catch(error => {
    console.log(error)
})