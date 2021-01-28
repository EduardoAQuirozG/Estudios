require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('600f866459cc510cb476ccc8').then(task => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then(result => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })

const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })
    return count
}

deleteTaskAndCount('600f921acd3c1a4bf4dfb758', false).then(count => {
    console.log(count)
}).catch(error => {
    console.log(error)
})