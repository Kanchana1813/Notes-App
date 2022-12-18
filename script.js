const addNoteButton = document.getElementById('add-notes');
const inputTitle = document.getElementById('title');
const inputDate = document.getElementById('due-date');
const inputDescriptionData = document.getElementById('description');
const yourNotesSection = document.getElementById('your-notes');


const getItemFromSessionStorage = () => {
    let notes = sessionStorage.getItem('notes');
    
    if(notes){
        notes = JSON.parse(notes);
    }
    return notes;
}

const addNotesOnPageLoad = () => {
    let notesData = getItemFromSessionStorage();
    if (notesData) {
        notesData.forEach(notes => {
            addNote(notes.title, notes.date, notes.description);
        });
    }
}

document.addEventListener('DOMContentLoaded', addNotesOnPageLoad);


const storeNotes = () => {

    // checking in session storage if notes array is present
    let notes = getItemFromSessionStorage();
    let notesObj = {
        title: inputTitle.value,
        date: inputDate.value,
        description: inputDescriptionData.value
    }
    if (notes) {
        notes.push(notesObj);
        sessionStorage.setItem('notes', JSON.stringify(notes));
    }else{
        let newNotes = [];
        newNotes.push(notesObj);
        sessionStorage.setItem('notes', JSON.stringify(newNotes));
    }
}


addNoteButton.addEventListener('click', () => {
    addNote(inputTitle.value, inputDate.value, inputDescriptionData.value);
    storeNotes();
})

const createParaAndAddValue = (value) => {
    const newNoteTitle = document.createElement('p');
    newNoteTitle.innerText = value;
    return newNoteTitle; 
}

const createDeleteButton = () => {

    // creating delete button
    const deleteNoteButton = document.createElement('button');
    // adding text
    deleteNoteButton.innerText = 'Delete';

    deleteNoteButton.setAttribute('style', 'border-radius: 10px; background-color: black; color: aliceblue; cursor: pointer; font-weight: bolder; padding: 5px; width: 80px; height: 40px',)

    // adding listener 
    deleteNoteButton.addEventListener('click',()=>{
        const elementToBeRemoved = event.target.parentElement;
        elementToBeRemoved.remove();  // removes notesWrapper
        sessionStorage.removeItem('notes');
    })

    return deleteNoteButton;
}


const addNote = (title, date, description) => {

    // creating a wrapper
    const notesWrapper = document.createElement('div');
    notesWrapper.className = 'wrapper';

    // create title element
    let titleTag = createParaAndAddValue(title);
    let dateTag = createParaAndAddValue(date);
    let descTag = createParaAndAddValue(description);
    // note delete button
    const deleteButton = createDeleteButton();

    // appending notes in wrapper div
    notesWrapper.appendChild(titleTag);

    // appending description
    notesWrapper.appendChild(descTag);

    // appending date
    notesWrapper.appendChild(dateTag);
 
    // appending delete button in wrapper div
    notesWrapper.appendChild(deleteButton);


    // adding wrapper in section
    yourNotesSection.appendChild(notesWrapper);
}

