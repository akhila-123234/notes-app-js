const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {

        let noteDiv = document.createElement("div");
        noteDiv.className = "note";

        let inputBox = document.createElement("textarea");
        inputBox.value = note.text;
        inputBox.placeholder = "Write your note...";

        let time = document.createElement("time");
        time.className = "time";
        time.innerText = note.time;

        let saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.className = "save-btn";

        let img = document.createElement("img");
        img.src = "images/delete.png";

        // SAVE
        saveBtn.addEventListener("click", () => {
            notes[index].text = inputBox.value;
            notes[index].time = new Date().toLocaleString();
            saveNotes();
            displayNotes();
        });

        // DELETE
        img.addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes();
            displayNotes();
        });

        noteDiv.appendChild(inputBox);
        noteDiv.appendChild(time);
        noteDiv.appendChild(saveBtn);
        noteDiv.appendChild(img);

        notesContainer.appendChild(noteDiv);
    });
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

createBtn.addEventListener("click", () => {
    notes.push({
        text: "",
        time: new Date().toLocaleString()
    });

    saveNotes();
    displayNotes();
});
displayNotes();