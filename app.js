// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI constructor
function UI() {}

// Add book to list

UI.prototype.addBookToList = function(book) {
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

UI.prototype.clearFields = function() {
    // get fields
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';

}

UI.prototype.showAlert = function(message, className) {

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
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

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
    ui.showAlert('Book deleted!', 'success');
    e.preventDefault();
})