require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('600f845c0d9c3a38c4d97ebc', { age: 30 }).then(user => {
//     console.log(user)
//     return User.countDocuments({ age: 30 })
// }).then(result => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('600f845c0d9c3a38c4d97ebc', 2).then(count => {
    console.log(count)
}).catch(error => {
    console.log(error)
})