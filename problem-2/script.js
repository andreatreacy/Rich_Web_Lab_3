
// link to the HTML elements
const notesContainer = document.getElementById("content-area");
const newNoteButton = notesContainer.querySelector(".new-note");

// when the new note button is clicked, create a new note
newNoteButton.addEventListener("click", () => newNote());


// get all notes that are saved to local storage. If there are none get an empty array
function getAllNotes() {
	return JSON.parse(localStorage.getItem("myNotes") || "[]");
}

// add the note elements to the page
getAllNotes().forEach((note) => {
	const noteElement = addNoteElement(note.id, note.message, note.color);
	notesContainer.insertBefore(noteElement, newNoteButton);
});




// save the array of notes to local storage
function saveNotes(notes) {
	localStorage.setItem("myNotes", JSON.stringify(notes));
}


// create the new text area for the note
function addNoteElement(id, message, color) {
	// create a new text area
	const element = document.createElement("textarea");

	// make the text area the input colour
	element.style.backgroundColor = color;
	
	// link the text area to a class
	element.classList.add("note");
	
	// add the input message to the note
	element.value = message;
	
	// add placeholder text for a note without a message
	element.placeholder = "Note...";

	// edit the note when it is clicked on
	element.addEventListener("change", () => {
		editNote(id, element.value, document.getElementById("ColorPicker").value);
	});

	// delete the note when it is double clicked
	element.addEventListener("dblclick", () => {
	// create a pop up to let the user decide if they want to delete the note
    const yesDelete = confirm(
      "Are you sure you want to delete this note?"
    );

	// if the user confirms, delete the note
    if (yesDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}


// add a new note
function newNote() {
	const notes = getAllNotes();
  
	// assign an id, colour from the colour picker, and empty message (as default) to the new note
	const noteObj = {
		id: Math.floor(Math.random() * 100000),
		message: "",
		color: document.getElementById("ColorPicker").value
	};

	// add the new note
	const noteElement = addNoteElement(noteObj.id, noteObj.message, noteObj.color);
  
	// place the new note before the new note button
	notesContainer.insertBefore(noteElement, newNoteButton);

	// add the new note to the array of notes
	notes.push(noteObj);
  
	// save the array of notes with the new note
	saveNotes(notes);
}


// replace the content of the note with the input id
function editNote(id, newMessage, newColor) {
	// find all notes in local storage
	const notes = getAllNotes();
	  
	// find the note with the input id
	const editedNote = notes.filter((note) => note.id == id)[0];

	// replace the note's message with the new message
	editedNote.message = newMessage;
	
	// replace the note's colour with the new colour
	editedNote.color = newColor;
	  
	// save the note array with the new content
	saveNotes(notes);
	  
	// refresh the page so the note will reload with the new content
	document.location.reload();
}



// delete the note with the input id
function deleteNote(id, element) {
	// find all the notes with an id that is not the input id
	const notes = getAllNotes().filter((note) => note.id != id);
	
	// save all the notes except the one with the input id
	saveNotes(notes);
	
	// remove the note element with the input id from the DOM
	notesContainer.removeChild(element);
}
