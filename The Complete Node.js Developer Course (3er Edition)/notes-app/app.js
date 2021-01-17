// const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

const log = console.log;

// log(notes())
// console.log("Is Email?", validator.isEmail('eduardo@example.com'))
// console.log("Is URL?", validator.isURL('http/udemy.com'))

// log(chalk.red.bold.inverse("Error!"))
// log(process.argv)

// const command = process.argv[2];

// if(command === 'add') {
//     log('Adding note!');
// } else if (command === 'remove') {
//     log('Removing note!');
// }

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add', 
    describe: 'Add a new note', 
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true, 
            type: 'string'
        }, 
        body: {
            describe: 'Body of the note', 
            demandOption: true, 
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove', 
    describe: 'Remove a note', 
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true, 
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes', 
    handler() {
        notes.listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read', 
    describe: 'Read a note', 
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true, 
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// Needs to create the information in order to execute, so log or parse work perfect
yargs.parse()
//log(yargs.argv)