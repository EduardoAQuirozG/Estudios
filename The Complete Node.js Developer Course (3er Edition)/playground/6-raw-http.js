const http = require('http')

const access_key = ''
const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=45,-75&units=f'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data += chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()