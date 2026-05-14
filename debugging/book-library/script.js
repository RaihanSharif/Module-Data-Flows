let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );

    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const isReadCheckbox = document.getElementById("check");
const submitBtn = document.getElementById("submit-btn");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number(pagesInput.value);

  if (title === "") {
    alert("Please fill title field!");
    return false;
  }

  if (!Number.isInteger(pages) || pages < 1) {
    alert("Pages must be a whole number greater than 0!");
    return false;
  }

  const book = new Book(title, author, pages, isReadCheckbox.checked);

  if (isBookInLibrary(book)) {
    alert("This book is already in the library!");
    return false;
  }
  myLibrary.push(book);
  resetInputFields();
  render();
}

submitBtn.addEventListener("click", submit);

function isBookInLibrary(newBook) {
  return myLibrary.some(
    (old) =>
      old.title.toLowerCase() === newBook.title.toLowerCase() &&
      old.author.toLowerCase() === newBook.author.toLowerCase()
  );
}

function resetInputFields() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  isReadCheckbox.checked = false;
}

function Book(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow(1);
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeCompletedBtn = document.createElement("button");
    changeCompletedBtn.className = "btn";
    wasReadCell.appendChild(changeCompletedBtn);
    let readStatus = "";
    if (myLibrary[i].completed == true) {
      readStatus = "Yes";
      changeCompletedBtn.classList.add("btn-success");
      changeCompletedBtn.classList.remove("btn-secondary");
    } else {
      readStatus = "No";
      changeCompletedBtn.classList.remove("btn-success");
      changeCompletedBtn.classList.add("btn-secondary");
    }
    changeCompletedBtn.textContent = readStatus;

    changeCompletedBtn.addEventListener("click", function () {
      myLibrary[i].completed = !myLibrary[i].completed;
      render();
    });

    //add delete button to every row and render again
    let delBtn = document.createElement("button");
    deleteCell.appendChild(delBtn);
    delBtn.className = "btn btn-warning";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}
