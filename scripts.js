const myLibrary = []

const libraryDiv = document.querySelector(".library");
const cardElementArr = [];

const modalElement = document.querySelector("dialog");
const formElement = document.querySelector("form");

function Book(title, author, pages, hasRead) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.hasRead = hasRead;
}

Book.prototype = {
    getReadStatus() {
        if (this.hasRead) {
            return `Has read`;
        }

        return `Not yet read`;
    },

    toggleReadStatus() {
        this.hasRead = !this.hasRead;
    },

    getBookInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.bookRead()}`
    }
}

function CardElement(book, index) {
    function createBookDataDiv() {
        let bookData = {
            containerDiv: document.createElement("div"),
            bookTitle: document.createElement("h2"),
            bookAuthor: document.createElement("h4"),
            bookPages: document.createElement("h4"),
        }

        bookData.bookTitle.textContent = book.title;
        bookData.bookAuthor.textContent = book.author;
        bookData.bookPages.textContent = `${book.pages} Pages`;

        bookData.containerDiv.setAttribute("class", "book-data");
        bookData.containerDiv.append(bookData.bookTitle, bookData.bookAuthor, bookData.bookPages);

        return bookData;
    }

    function createBookStatusP() {
        let bookStatus = {
            containerP: document.createElement("p"),
            containerSpan: document.createElement("span"),
        }

        bookStatus.containerSpan.textContent = book.getReadStatus();
        bookStatus.containerSpan.setAttribute("class", `${myLibrary[index].hasRead ? "blue-text" : "red-text"}`);

        bookStatus.containerP.textContent = "Status: ";
        bookStatus.containerP.setAttribute("class", "book-read-status");
        bookStatus.containerP.append(bookStatus.containerSpan);

        return bookStatus;
    }

    function createBookButtonsDiv() {
        function createDeleteButton() {
            let deleteElement = {
                button: document.createElement("button"),
                icon: document.createElement("img"),
            }

            deleteElement.icon.setAttribute("src", "icons/delete_24dp.svg");
            deleteElement.icon.setAttribute("alt", "Delete Book");

            deleteElement.button.append(deleteElement.icon, "Delete");
            deleteElement.button.setAttribute("class", "btn delete-book white-text");

            return deleteElement;
        }

        let bookButtons = {
            containerDiv: document.createElement("div"),
            deleteElement: createDeleteButton(),
        }

        bookButtons.containerDiv.setAttribute("class", "book-buttons");
        bookButtons.containerDiv.append(bookButtons.deleteElement.button);

        return bookButtons;
    }

    this.containerDiv = document.createElement("div");
    this.bookData = createBookDataDiv();
    this.bookStatus = createBookStatusP();
    this.bookButtons = createBookButtonsDiv();

    this.containerDiv.setAttribute("class", "card")
    this.containerDiv.setAttribute("data-index", index); // Object to DOM Node connection

    this.containerDiv.append(this.bookData.containerDiv, this.bookStatus.containerP, this.bookButtons.containerDiv);
}

function addBookToLibrary(title, author, pages, hasRead) {
    let book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    return book;
}

function createCard(book, index) {
    let card = new CardElement(book, index);
    libraryDiv.append(card.containerDiv);
    cardElementArr.push(card);
}

function displayLibrary() {
    myLibrary.forEach((book, index) => {
        if (Object.getPrototypeOf(book) === Book.prototype) {
            createCard(book, index);
        }
    })
}

function extractFormData() {
    let bookValues = [];
    let formData = new FormData(formElement);

    formData.forEach(value => {
        bookValues.push(value);
    });

    return bookValues;
}

function processNewBook() {
    let bookValues = extractFormData();
    return addBookToLibrary(bookValues[0], bookValues[1], bookValues[2], bookValues[3] === "true");
}

function removeBook(index) {
    myLibrary.splice(index, 1);
}

window.addEventListener("load", () => {
    // Dummy data
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", false);
    addBookToLibrary("The Courage To Be Disliked", "Ichiro Kishimi, Fumitake Koga", "288", true);
    addBookToLibrary("The Subtle Art of Not Giving a F*ck", "Mark Manson", "224", false);
    addBookToLibrary("There are Rivers in the Sky", "Elif Shafak", "464", false);

    displayLibrary();
});

window.addEventListener("click", (e) => {
    if (e.target.classList.value.includes("modal-open")) {
        modalElement.showModal();
    }

    if (e.target.classList.value.includes("modal-close")) {
        modalElement.close();
    }

    if (e.target.classList.value.includes("delete-book")) {
        let index = +(e.target.closest(".card").getAttribute("data-index"));
        removeBook(index);
    }

});

window.addEventListener("submit", (e) => {
    e.preventDefault();
    createCard(processNewBook(), myLibrary.length - 1);
    formElement.reset();
    modalElement.close();
});