const fs = require('fs')

const getNotes = function() {
    return 'Your notes...'
}

// Adding note
const addNote = function(title, body) {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(function(note) {
        return note.title === title
    })

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title, 
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

// Loads notes
const loadNotes = function() {
    try {
        const fileBuffer = fs.readFileSync('notes.json')
        const fileString = fileBuffer.toString();
        return JSON.parse(fileString);
    } catch (e) {
        return []
    }
}

// Saves notes
const saveNotes = function(notes) {
    const dataString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataString)
}

// Remove note
const removeNote = function(title) {
    console.log('Note "' + title + '" removed!')
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote, 
    removeNote: removeNote
}