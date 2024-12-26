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

function addBookToLibrary(title, author, pages, hasRead) {
    let book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    return book;
}
