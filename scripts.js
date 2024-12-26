const myLibrary = []

const libraryDiv = document.querySelector(".library");
const cardElementArr = [];

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

    this.containerDiv = document.createElement("div");
    this.bookData = createBookDataDiv();
    this.bookStatus = createBookStatusP();

    this.containerDiv.setAttribute("class", "card")
    this.containerDiv.setAttribute("data-index", index); // Object to DOM Node connection

    this.containerDiv.append(this.bookData.containerDiv, this.bookStatus.containerP);
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