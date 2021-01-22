const request = require('postman-request')

// mapbox.com API
const mapbox_accessToken = 'pk.eyJ1IjoiZWR1YXJkb2FxdWlyb3pnIiwiYSI6ImNrazByanpqazBjdmoycnBqOWkwcmR3MHEifQ.DGv-_60EOONUWhHLYSq55A'

// Get the geocode
const geocode = (address, callback) => {
    console.log('We start the geocode process.')
    const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapbox_accessToken

    request({ 'url': mapbox_url, 'json': true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to geolocation service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;