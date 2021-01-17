const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const log = console.log;
const address = process.argv[2]

if (address){
    // Get the geocode
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return log('Error', error)
        }

        // Get the forecast
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return log('Error', error)
            }
            
            log(location)
            log(forecastData)
        })
    })
} else {
    log('Error', 'No address was provided.')
}