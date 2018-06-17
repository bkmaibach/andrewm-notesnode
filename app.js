const fs = require('fs');
const os = require('os');
const notes = require ('./notes.js');
const yargs = require ('yargs');
const _ = require('lodash');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions,
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

var command = process.argv[2];

if (command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('note added');
        notes.logNote(note);
    } else{
        console.log('Note not added!')
    }
} else if (command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes...`);
    allNotes.forEach(note => {
        notes.logNote(note);
    });
} else if (command === 'read'){
   logNote(notes.getNote(argv.title));
} else if (command === 'remove'){
    notes.removeNote(argv.title);
} else {
    console.log('Command not recognized');
}

