// console.log("welcome")
shownotes();

//If a user adds a note , add it to a local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {

    let addtext = document.getElementById('addtext');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let myObj = {
        title:addtitle.value,
        text:addtext.value
    }

    notesobj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addtext.value = "";
    addtitle.value = "";
    console.log(notesobj);
    shownotes();
})
//function to show elements from local storage
function shownotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
         <div class="card-body">
              <h5 class="card-title"> ${element.title}</h5>
                 <p class="card-text">${element.text}</p>
              <button id="${index}" onclick = "deletenote(this.id) " class="btn btn-primary">Delete Notes</button>
            </div>
          </div>
                `
    });
    let noteselem = document.getElementById('notes');
    if (notesobj.length != 0) {
        noteselem.innerHTML = html;
    }
    else {
        noteselem.innerHTML = `<b>nothing to show!  Add notes to get notes`
    }
}

//function to delete a note

function deletenote(index) {
    console.log('i am deleting this note', index);
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    shownotes();
}

let searchtext = document.getElementById('searchtext');

searchtext.addEventListener('input', function () {
    let inputval = searchtext.value.toLowerCase();
    
    console.log("input event fired", inputval);
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function (element) {
        let cardtext = element.getElementsByTagName('p')[0].innerHTML;
        // console.log(cardtext)
        if (cardtext.includes(inputval)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })
});