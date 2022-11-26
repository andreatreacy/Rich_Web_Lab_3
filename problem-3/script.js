// import from rxjs
const { Observable, fromEvent } = rxjs;

// link to the HTML elements
const parentNotesContainer = document.getElementById("parent-notes");
const childNotesContainer = document.getElementById("child-notes");
const newNoteButton = parentNotesContainer.querySelector(".new-note");

// when the new note button is clicked, create a new parent note
fromEvent(newNoteButton, 'click').subscribe(() => newNote());

// clear the local storage of any existing notes
//localStorage.clear();

// get all parent notes that are saved to local storage. If there are none get an empty array
function getAllNotes() {
	return JSON.parse(localStorage.getItem("myNotes") || "[]");
}

// get all child notes that are saved to local storage. If there are none get an empty array
function getAllChildNotes() {
	return JSON.parse(localStorage.getItem("myChildNotes") || "[]");
}


// add the parent note elements to the page
getAllNotes().forEach((note) => {
	const noteElement = addNoteElement(note);
	parentNotesContainer.insertBefore(noteElement, newNoteButton);
});

// add the child note elements to the page
getAllChildNotes().forEach((note) => {
	const noteElement = addChildNoteElement(note);
	childNotesContainer.appendChild(noteElement);
});


// save the array of parent notes to local storage
function saveNotes(notes) {
	localStorage.setItem("myNotes", JSON.stringify(notes));
}

// save the array of child notes to local storage
function saveChildNotes(notes) {
	localStorage.setItem("myChildNotes", JSON.stringify(notes));
}


// note class that is used to create parent and child notes
class Note {
    constructor(id, message, color, parent_id)
	{
		this.id = id;
		this.message = message;
		this.color = color;
		this.parent_id = parent_id;
    }
}



// add a new parent note
function newNote() {
	// find all parent notes in local storage
	const notes = getAllNotes();
  
	// assign an id, colour from the colour picker, an empty message (as default), and null to the new note
	// the null is for the parent_id value and a parent note does not have a parent
	let noteObj = new Note(Math.floor(Math.random() * 100000),"",document.getElementById("ColorPicker").value,null);

	// add the new note element
	const noteElement = addNoteElement(noteObj);

	// place the new note before the new note button
	parentNotesContainer.insertBefore(noteElement, newNoteButton);

	// add the new note to the array of parent notes
	notes.push(noteObj);
  
	// save the array of parent notes with the new note
	saveNotes(notes);
}


// create the new text area for the parent note
function addNoteElement(noteObj) {
	// create a new text area
	const element = document.createElement("textarea");

	// make the text area the input colour
	element.style.backgroundColor = noteObj.color;
	
	// link the text area to a class
	element.classList.add("note");
	
	// add the input message to the note
	element.value = noteObj.message;
	
	// add placeholder text for a note without a message
	element.placeholder = "Note...";

	// edit the note when it is clicked on
	fromEvent(element, 'change').subscribe(() => editNote(noteObj.id, element.value, document.getElementById("ColorPicker").value, noteObj.parent_id));
	
	// call deleteOrChild when the note is double clicked
	fromEvent(element, 'dblclick').subscribe(() => deleteOrChild(noteObj.id, element, noteObj.parent_id, noteObj.color));

  return element;
}



// replace the content of the note with the input id
function editNote(id, newMessage, newColor, parent_id) {
	// if the note to be edited is a parent note
	if(parent_id == null)
	{
		// find all parent notes in local storage
		const notes = getAllNotes();
			
		// find the parent note with the input id
		const editedNote = notes.filter((note) => note.id == id)[0];

		// replace the note's message with the new message
		editedNote.message = newMessage;
		
		// replace the note's colour with the new colour
		editedNote.color = newColor;
		  
		// save the parent note array with the new content
		saveNotes(notes);
		
		// find all child notes in local storage
		const cNotes = getAllChildNotes();
		
		// find the child notes who's parent_id is the input id
		const editedChildNote = cNotes.filter((note) => note.parent_id == id);
		
		// change the colour of the child notes to the new colour of the parent note
		for(let i = 0; i < editedChildNote.length; i++)
		{
		  editedChildNote[i].color = newColor;
		}
		
		// save the child notes with the new colour
		saveChildNotes(cNotes);
	}
	// if the note to be edited is a child note
	else
	{
		// find all child notes in local storage
		const cNotes = getAllChildNotes();
		
		// find the child note with the input id
		const editedNote = cNotes.filter((note) => note.id == id)[0];

		// replace the note's message with the new message
		editedNote.message = newMessage;
	
		// save the child note array with the new content
		saveChildNotes(cNotes);
	}
	
	// refresh the page so the note will reload with the new content
	document.location.reload();
}



/* this function creates two pop ups
one asking the user if they want to create a child note
and one asking if the user wants to delete the note*/
function deleteOrChild(id, element, parent_id, parent_color) {
	// if a parent note was double clicked, give the user the option to create a child note
	if(parent_id == null)
	{
		//create a pop up to let the user decide if they want to create a child of this note
		const yesChild = confirm(
			"Do you want to create a child of this note?"
		);

		// if the user confirms, create the child note
		if(yesChild) 
		{
			newChildNote(id, element, parent_color);
		}
		// if the user does not want to create a child note
		else
		{
			//create a pop up to let the user decide if they want to delete the note
			const yesDelete = confirm(
				"Do you want to delete this note?"
			);

			// if the user confirms, delete the note
			if (yesDelete) 
			{
				 deleteNote(id, element, parent_id);
			}
		}
	}
	// if a child note was double clicked
	else
	{
		// create a pop up to let the user decide if they want to delete the note
		const yesDelete = confirm(
			"Do you want to delete this note?"
		);

		// if the user confirms, delete the note
		if (yesDelete) 
		{
			deleteNote(id, element, parent_id);
		}
	}
}



// delete the note with the input id
function deleteNote(id, element, parent_id) 
{
	// if the note to be deleted is a parent
	if(parent_id == null)
	{
		// remove the parent note element with the input id's child notes
		
		// find all the child notes with a parent_id that is not the input id
		const childNotes = getAllChildNotes().filter((note) => note.parent_id != id);
		
		// save all the child notes except the ones with the parent_id of input id
		saveChildNotes(childNotes);
		
		// get all the textarea elements on the page
		let textAreaElements = document.querySelectorAll("textarea");
		
		// go through all the textarea elements
		for(let i = 0; i < textAreaElements.length; i++)
		{
			// if the textarea has an id of the note being deleted, remove it from the pageX
			// when a child note textarea element is being created it is assigned the id of it's parent
			if(textAreaElements[i].id == id)
			{
				childNotesContainer.removeChild(textAreaElements[i]);
			}
		}
		
		// remove the parent note
		
		// find all the parent notes with an id that is not the input id
		const notes = getAllNotes().filter((note) => note.id != id);
		
		// save all the parent notes except the one with the input id
		saveNotes(notes);
		
		// remove the parent note element with the input id from the DOM
		parentNotesContainer.removeChild(element);
	}
	// if the note to be deleted is a child
	else
	{
		// find all the child notes with an id that is not the input id
		const cNotes = getAllChildNotes().filter((note) => note.id != id);
		
		// save all the child notes except the one with the input id
		saveChildNotes(cNotes);
		
		// remove the child note element with the input id from the DOM
		childNotesContainer.removeChild(element);
	}
}


// add a new child note
function newChildNote(parentId, element, parent_color) {
	// get all child notes saved in local storage
	const notes = getAllChildNotes();
	
	// assign an id, colour from the parent, an empty message (as default), and the parent id to the new note
	let noteObj = new Note(Math.floor(Math.random() * 100000),"",parent_color, parentId);

	// add the new child note element
	const noteElement = addChildNoteElement(noteObj);
  
	// place the new child note in the child notes container
	childNotesContainer.appendChild(noteElement)

	// add the new child note to the array of notes
	notes.push(noteObj);
  
	// save the array of child notes with the new note
	saveChildNotes(notes);
}




// create the new text area for the child note
function addChildNoteElement(noteObj) {
	// create a new text area
	const element = document.createElement("textarea");

	// make the text area the input colour
	element.style.backgroundColor = noteObj.color;
	
	// link the text area to a class
	element.classList.add("note");
	
	// add the input message to the note
	element.value = noteObj.message;
	
	// add placeholder text for a note without a message
	element.placeholder = "Note...";
	
	// link the child element to the parent by giving it the parent id
	element.id = noteObj.parent_id;

	// edit the child note when it is clicked on
	fromEvent(element, 'change').subscribe(() => editNote(noteObj.id, element.value, noteObj.color, noteObj.parent_id));
	
	// call deleteOrChild when the note is double clicked
	fromEvent(element, 'dblclick').subscribe(() => deleteOrChild(noteObj.id, element, noteObj.parent_id));

  return element;
}
