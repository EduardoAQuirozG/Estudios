const fs = require('fs')

// const book = {
//     title: 'Ego is the Enemy', 
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataString = dataBuffer.toString()
// const data = JSON.parse(dataString)

// console.log(data.author);



const fileBuffer = fs.readFileSync('1-json.json')
const fileJSON = JSON.parse(fileBuffer.toString())

fileJSON.name = "Eduardo"
fileJSON.age = 30

const fileString = JSON.stringify(fileJSON)
fs.writeFileSync('1-json.json', fileString);
