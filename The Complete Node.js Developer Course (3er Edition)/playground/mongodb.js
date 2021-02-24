// const mongodb = require('mongodb');

// We create the client
// const MongoClient = mongodb.MongoClient;
// We get the ObjectID
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID, DBRef} = require('mongodb')

// We give the url where mongodb is located
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//We get the Id thats going to be used by mongodb
// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.getTimestamp())
// console.log(id.toHexString().length)

// CRUD operations
MongoClient.connect(
    connectionURL, 
    { useUnifiedTopology: true }, 
    (error, client) => {
        if (error) {
            return console.log('Unable to connect to database')
        }

        // We create a new database or call it if its created
        const db = client.db(databaseName)

        // CREATE ---------------------------------------------------------

        // We create or call a collection then we insert 
        // one document with the respective field
        // db.collection('users').insertOne({
        //     _id: id,
        //     name: 'Andrea', 
        //     age: 28
        // }, (error, result) => {
        //     if (error) {
        //         return console.log('Unable to insert user.')
        //     }

        //     console.log(result.ops)
        // })

        // We create or call a collection then we insert multiple
        // documents with the respective fields
        // db.collection('users').insertMany(
        // [
        //     {
        //         name: 'Flor', 
        //         age: 28
        //     }, 
        //     {
        //         name: 'Georgina', 
        //         age: 53
        //     }
        // ], 
        // (error, result) => {
        //     if (error){
        //         return console.log('Unable to insert multiple users.')
        //     }

        //     console.log(result.ops)
        // })

        // We create or call a collection then we insert multiple
        // documents with the respective fields
        // db.collection('tasks').insertMany([
        //     {
        //         description: 'Study Node.js', 
        //         completed: true
        //     }, 
        //     {
        //         description: 'Do exercise', 
        //         completed: false
        //     }, 
        //     {
        //         description: 'Take a bath', 
        //         completed: false
        //     }
        // ], (error, result) => {
        //     if (error) {
        //         return console.log('Unable to insert tasks.')
        //     }

        //     console.log(result.ops);
        // })

        // READ ---------------------------------------------------------

        // We go ahead and do a FirstOrDefault
        // db.collection('users').findOne({
        //     _id: new ObjectID('600ba72d402c2e4b245e6687')
        // }, (error, user) => {
        //     if (error) {
        //         return console.log('Unable to fetch.')
        //     }

        //     console.log(user)
        // })

        // We go ahead and make a list search
        // db.collection('users').find({
        //     age: 28
        // }).toArray((error, users) => {
        //     console.log(users)
        // })

        // db.collection('users').find({
        //     age: 28
        // }).count((error, count) => {
        //     console.log(count)
        // })

        // db.collection('tasks').findOne({ _id: new ObjectID('600a592e4682a13030ac373c') }, 
        //     (error, task) => {
        //         if (error) {
        //             return console.log('Unable to fetch.')
        //         }

        //         console.log(task)
        //     })
        
        // db.collection('tasks').find({ completed: false }).toArray(
        //     (error, tasks) => {
        //         if (error) {
        //             return console.log(error)
        //         }

        //         console.log(tasks)
        //     }
        // )

        //UPDATE ---------------------------------------------------------
        // We use operator $set to set the variables that we are going to update
        // db.collection('users').updateOne(
        //     { 
        //         _id: new ObjectID('600ba72d402c2e4b245e6687') 
        //     }, {
        //         $set: {
        //             name: 'Carlos'
        //         }
        //     }).then(result => {
        //         console.log(result)
        //     }).catch(error => {
        //         console.log(error)
        //     })

        // We use operator $inc to increment or decrement a number
        // without having to first fetch, then update
        // db.collection('users').updateOne(
        //     { 
        //         _id: new ObjectID('600ba72d402c2e4b245e6687') 
        //     }, {
        //         $inc: {
        //             age: 1
        //         }
        //     }).then(result => {
        //         console.log(result)
        //     }).catch(error => {
        //         console.log(error)
        //     })

        // We update many fields
        // db.collection('tasks').updateMany( 
        //     { 
        //         completed: false 
        //     }, {
        //         $set: {
        //             completed: true
        //         }
        //     }).then(result => {
        //         console.log(result)
        //     }).catch((error) => {
        //         console.log(error)
        //     })

        // DELETE ---------------------------------------------------------
        
        // We delete many with the conditions given
        // db.collection('users').deleteMany({ 
        //         age: 28
        //     }).then(result => {
        //         console.log(result)
        //     }).catch(error => {
        //         console.log(error)
        //     })

        // We delete one using the ObjectID
        // db.collection('users').deleteOne({
        //     _id: new ObjectID('600a55b450dd64372464294d')
        // }).then(result => {
        //     console.log(result)
        // }).catch(error => {
        //     console.log(error)
        // })

        // We delete one using the descripcion
        db.collection('tasks').deleteOne({
            description: 'Study Node.js'
        }).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    })