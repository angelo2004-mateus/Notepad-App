const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
popupTitle = document.querySelector('header p'),
closeIcon = popupBox.querySelector('header i'),
titleTag = popupBox.querySelector('input'),
descTag = popupBox.querySelector('textarea'),
addBtn = popupBox.querySelector('button');



const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
                'Junho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

// getting localStorage notes if exist and parsing them
// to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem('notes') || "[]");
let isUpdate = false, updateId;
addBox.addEventListener('click', () => {
    popupBox.classList.add('show');
})

closeIcon.addEventListener('click', () => {
    isUpdate = false;
    titleTag.value = '';
    descTag.value = '';
    addBtn.innerText = 'Add new Note'
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.remove('show');
})

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) =>{  let liTag = `<li class="note" style="color:${note.color};";
       ">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i> Edit</li>
                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i> Delete</li>
                </ul>
            </div>
        </div>
    </li>`
        addBox.insertAdjacentHTML("afterend", liTag)
    })
}



showNotes();

const cardNote = document.querySelector('.note')





function showMenu(elem) {
    elem.parentElement.classList.add('show');
    document.addEventListener('click', e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove('show');
        }
    });
}

function deleteNote(noteId) {
    notes.splice(noteId, 1) //removing selected note from array/tasks
    // saving updated notes to localstorage
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = 'Update note';
    popupTitle.innerText = 'Update a note';
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let noteColor = ['blue', 'red'];
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        let dateObj = new Date(),
        month = months[dateObj.getMonth() - 1],
        day = dateObj.getDay() + 13,
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}. ${year}`,
            color: noteColor,
        }


        if(!isUpdate) {
            notes.push(noteInfo); // adicionando novas notas para o note
        }else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }

        
        //salvando notas no localStorage
        localStorage.setItem('notes', JSON.stringify(notes))
        closeIcon.click()
        showNotes();
    }
    
})
