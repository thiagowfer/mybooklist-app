// Book class: Represent a book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks(){
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '3434434'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '4545545'
            }
        ];

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));
   }

   static addBookToList(book){
       const list = document.querySelector('#book-list');
       const row = document.createElement('tr');
       
       row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
       `;

       list.appendChild(row);
   }

   static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
   }

   static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //Vanish in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
   }
   
   static clearFields(){
       document.querySelector('#title').value = '';
       document.querySelector('#author').value = '';
       document.querySelector('#isbn').value = '';
   }
}

// Store Class: Handles Storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all the fields','warning');
    } else {
        //Instantiate book
        const book = new Book(title, author, isbn);

        //Add book to UI
        UI.addBookToList(book);

        //Show success message
        UI.showAlert('Book Added', 'success');

        //Clear fields
        UI.clearFields();
    }
});

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', 
    (e) => {
        UI.deleteBook(e.target);
        //Show message when delete a item
        UI.showAlert('Book Removed', 'danger');
    });