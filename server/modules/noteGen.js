// function to generate the note for the task_notes/task_audit trail
function makeNote(user, status) {
    let userNote = `User: ${user}\n`;
    let statNote = `Status: ${status}\n`;
    let date = new Date;
    let dNote = `Date: ${date.toGMTString()}\n`;
    return `--------------\n${userNote}${statNote}${dNote}`;
}
module.exports = { makeNote:makeNote };