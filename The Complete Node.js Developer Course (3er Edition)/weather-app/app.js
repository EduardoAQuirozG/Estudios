const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const log = console.log;

// Get the geocode
geocode('Aguascalientes', (error, data) => {
    if(error) {
        log('Error', error)
    } else {
        log('Data', data)
    }
})

// Get the forecast
forecast(44.1545, -75.7088, (error, data) => {
    if(error) {
        log('Error', error)
    } else {
        log('Data', data)
    }
})