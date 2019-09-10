console.log("starting app.js");

const fs = require('fs');
const _ = require('lodash');
const yargs=require('yargs');
const notes=require('./notes.js');

const titleOptions = {
    describe:'Title of note',
    demand:true,
    alias:'t'   
};

const argv = yargs                        //const argv=yargs.argv;
    .command('add','Add a new note',{
        title:{
            describe:'Title of note',
            demand:true,
            alias:'t'                     //instead of --title,we can use -t in terminal
        },
        body : {
            describe:'Body of note',
            demand:true,
            alias:'b'                     //instead of --body in  terminal, we can simply use -b
        }
    })
    .command('list','List all notes')
    .command('read','Read a note', {
        title:titleOptions
    })
    .command('remove','Remove a note', {
        title:titleOptions
    })
    .help()                    //to check run "node app.js add --help" in terminal
    .argv;
var command = argv._[0];                 // process.argv[2] (for command line arguments(3rd pos.)) can also be used
console.log('Command: ', command);

console.log('process:',process.argv);
console.log('Yargs:',argv);

if(command === 'add'){
    var note = notes.addNote(argv.title,argv.body);
    if(note){
        console.log('Node created');
        console.log('--');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }
    else{
        console.log('Title already exists!');
    }
}
else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes`);
    
}
else if(command === 'read'){
    var x = notes.getNote(argv.title);
    if (x) {
        console.log(`Title: ${x.title}`);
        console.log(`Body: ${x.body}`);
    }
    else {
        console.log("note not found");
    }
}
else if(command === 'remove'){
    var x=notes.rN(argv.title);
    var msg = x ? 'Note removed' : 'Note not found';
    console.log(msg);
}
else{
    console.log("Command not recognised");
}