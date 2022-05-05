// function to generate the note for the task_notes/task_audit trail
function makeNote(user, status) {
    let userNote = `User: ${user}\n`;
    let statNote = `Status: ${status}\n`;
    let date = new Date;
    let dNote = `Timestamp: ${date.toDateString()} ${date.toTimeString()}\n`;

    return `--------------\n${userNote}${statNote}${dNote}`;
}

// NOT IN USED 
// function to generate the note for the task_notes/task_audit trail
function makeNotes(user, status) {
    let userNote = `User: ${user}\n`;
    let statNote = `Status: ${status[0]}\n`;
    let date = new Date;
    let dNote = `Timestamp: ${date.toDateString()} ${date.toTimeString()}\n`;
    let extraNote = '';
    if (status[0] === 'open') {
        extraNote = `${user} created the task.`
    }
    if (status.length === 2) {
        if (condition) {
            
        }
    }
    return `--------------\n${userNote}${statNote}${dNote}`;
}
module.exports = { makeNote:makeNote };