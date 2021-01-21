console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector('form')
const locationInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = locationInput.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // Get the API on the web server
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location))
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.innerHTML = data.forecast
            }
        })
    })
})