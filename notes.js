const fs = require('fs');

var fetchNotes = () => {
    try{
        var noteString = fs.readFileSync('./notes-data.json');
        var notes = JSON.parse(noteString);
        return notes;
    } catch (e){
        console.log(e);
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('./notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    // console.log('Adding note', title, body);
    var notes = fetchNotes();
    var note = {title, body}

    var duplicateNotes = notes.filter((note) => note.title === title);
    //when the above expression returns true, the element is added to duplicateNotes

    if (duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        console.log('Please supply a unique title');
    }

};

var getAll = () => {
    return fetchNotes();
};
var getNote = (title) => {
    return fetchNotes().filter((note) => note.title === title)[0];
};
var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title != title);
    saveNotes(filteredNotes);
    var message = notes.length === filteredNotes.length ? 'No note removed' : 'Note removed';
    console.log(message);
};

var logNote = function(note){
    debugger;
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote, //equivelant to addNote: addNote
    getAll,
    getNote,
    removeNote,
    logNote
};