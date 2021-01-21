console.log("Client side javascript file is loaded!")

// Get the API on the web server
fetch('http://localhost:3000/weather?address=!')
.then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })
})