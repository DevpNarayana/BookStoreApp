// define classes
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    // no constructor

    // methods
    addBookToList(book) {
        const list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML =
            `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete"> X </a> </td>
        `
        list.appendChild(row);
    }

    clearFields() {
        // get fields
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }

    showAlert(message, className) {

        // construct a div tag and show it below heading.
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // timeout to make error disappear
        setTimeout(function() {
            document.querySelector('.alert').remove()
        }, 3000);
    }
    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

}

// Managing in local storage
class Store {

    // fetch from local storage
    static getBooks() {
            let books;
            if (localStorage.getItem('books') === null) {
                books = [];
            } else {
                books = JSON.parse(localStorage.getItem('books'));
            }
            return books;
        }
        // bind books to UI
    static showBooks() {
        const books = this.getBooks();
        console.log(books);
        let ui = new UI();
        books.forEach(function(book) {
            ui.addBookToList(book);
        })
    }
    static deleteBook(isbn) {

        let books = this.getBooks();
        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
    static addBook(book) {
        let books = this.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
}

// DOM event listner
document.addEventListener('DOMContentLoaded', function() {
    console.log(' I am on form load');
    Store.showBooks();
});

// Event Listners
document.querySelector('#book-form').addEventListener('submit',
    function(e) {
        // get fields
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        // Instantiating a book
        const book = new Book(title, author, isbn);

        // Instantiate UI
        const ui = new UI();

        // Validate fields
        if (title === '' || author === '' || isbn === '') {

            ui.showAlert('Please fill in all the  fields', 'error');
        } else {
            // Add book to list
            ui.addBookToList(book);
            Store.addBook(book);
            // show success alert
            ui.showAlert('Added book!', 'success');
            // Clear fields

            ui.clearFields(book);
        }
        e.preventDefault();
    });

document.querySelector('#book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book deleted!', 'success');
    e.preventDefault();
});

// function onFormLoad() {
//     console.log('I am on form load');
//     Store.showBooks();
// }