const request = require('postman-request')

// weatherstack.com API
const weatherstack_accessKey = '';

// Get the forecast
const forecast = (latitude, longitude, callback) => {
    const weatherstack_url = 'http://api.weatherstack.com/current?access_key=' + weatherstack_accessKey + '&query=' + latitude + ',' + longitude + '&units=f'

    request({ 'url': weatherstack_url, 'json': true}, (error, response, body) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.success === false) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '.')
        }
    })
}

module.exports = forecast