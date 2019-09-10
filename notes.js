console.log("starting notes.js");
const fs = require('fs');

var fetchNotes =() => {
    try {                                  //executes irrespective of error
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e) {
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote = (title,body) => {
    console.log("Inside function addNote");
    var notes =fetchNotes();
    var note = {
        title:title,                        //can also be written as simmply title because same name
        body
    };
    
    var duplicateNotes = notes.filter((note) => { //if filter returns false, it wont be written to duplicateNotes array else value will be written
        return note.title === title;        //if returns true,it means title repeated
    });
   
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }     
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter ((note) => {
        return note.title === title;
    });
    return filteredNotes[0];   //index 0 because it is json array

};

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => {      //it will be filled with all notes not to be deleted
        return note.title !== title;
    });
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;     //compare length of original and modified notes
}
module.exports={
    addNote:addNote ,              //object attribute and variable function; can also be written as simply addNote since same name
    getAll,
    getNote,
    rN:removeNote
}