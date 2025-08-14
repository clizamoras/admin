const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderBooks();
}

function renderBooks() {
  const container = document.getElementById('books-container');
  container.innerHTML = '';

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.setAttribute('data-id', book.id);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
      <button class="toggle-read-btn">Toggle Read</button>
      <button class="remove-btn">Remove</button>
    `;

    // Toggle read button
    card.querySelector('.toggle-read-btn').addEventListener('click', () => {
      book.toggleRead();
      renderBooks();
    });

    // Remove button
    card.querySelector('.remove-btn').addEventListener('click', () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        renderBooks();
      }
    });

    container.appendChild(card);
  });
}

// Dialog and form logic
const dialog = document.getElementById('book-dialog');
const form = document.getElementById('book-form');
const newBookBtn = document.getElementById('new-book-btn');
const cancelBtn = document.getElementById('cancel-btn');

newBookBtn.addEventListener('click', () => {
  form.reset();
  dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = parseInt(formData.get('pages'));
  const read = formData.get('read') === 'true';

  addBookToLibrary(title, author, pages, read);
  dialog.close();
});

// Add dummy books to test
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
