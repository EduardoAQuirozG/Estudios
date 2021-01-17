const fs = require('fs')
const chalk = require('chalk')

// Adding note
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title)
    
    if(!duplicateNote) {
        notes.push({
            title: title, 
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// Loads notes
const loadNotes = () => {
    try {
        const fileBuffer = fs.readFileSync('notes.json')
        const fileString = fileBuffer.toString();
        return JSON.parse(fileString);
    } catch (e) {
        return []
    }
}

// Saves notes
const saveNotes = (notes) => {
    const dataString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataString)
}

// Remove note
const removeNote = (title) => {
    const notes = loadNotes()

    const nonDuplicateNotes = notes.filter((note) => note.title !== title)

    if(nonDuplicateNotes.length < notes.length) {
        saveNotes(nonDuplicateNotes)
        console.log(chalk.green.inverse('Note removed!'))
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

// List notes
const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes'))

    notes.forEach(note => console.log(note.title));
}

// Read note
const readNote = (title) => {
    const notes = loadNotes();

    const noteFound = notes.find(note => note.title === title)

    if(noteFound) {
        console.log(chalk.inverse(noteFound.title), noteFound.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

module.exports = {
    addNote: addNote, 
    removeNote: removeNote, 
    listNotes: listNotes, 
    readNote: readNote
}