const path = require('path')
const express = require('express')
const hbs = require('hbs')

const log = console.log

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

// Directory where the file is saved
// log(__dirname)
// Directory of the file
// log(__filename)
// Use path to get the document in public
// log(publicDirectoryPath)

const app = express()

// Dynamic templates
// Setup handlebars (hbs) engine
app.set('view engine', 'hbs')
// Setup views location
app.set('views', viewsPath)
// Setup partial location on hbs
hbs.registerPartials(partialsPath)

// localhost with static info
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// localhost with dynamic template
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home', 
        name: 'Eduardo Quiroz'
    })
})

// localhost/help with JSON res
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Eduardo', 
//         age: 30
//     })
// })

// localhost/help with dynamic templates
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        name: 'Eduardo Quiroz',
        message: 'Web page that provides some help.'
    })
})

// localhost/about with static info
// app.get('/about', (req, res) => {
//     res.send(path.join(publicDirectoryPath, 'about.html'))
// })

// localhost/about with dynamic template
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Eduardo Quiroz'
    })
})

// localhost/weather with JSON res
app.get('/weather', (req, res) => {
    res.send({
        location: 'Aguascalientes, Aguascalientes, Mexico.',
        forecast: 'Partly cloudy.'
    })
})

// localhost/help/* with dynamic template
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Eduardo Quiroz',
        errorMessage: 'Help article not found.' 
    })
})

// any page not currently in app
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eduardo Quiroz',
        errorMessage: 'Page not found'
    })
})

// Server is waiting and listening to any petition
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})