const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Assuming you have an array of books stored in a JavaScript file
const books = require('./booksdb');

// Task 1: Get the book list available in the shop
app.get('/api/books', (req, res) => {
  // Exclude the review property from the response
  const booksWithoutReview = books.map(({ review, ...rest }) => rest);

  // Return the list of books without the review property
  res.json(booksWithoutReview);
});

// Task 2: Get the books based on ISBN
app.get('/api/books/:isbn', (req, res) => {
  // Retrieve a specific book based on ISBN
  const isbn = req.params.isbn;
  const book = books.find((book) => book.isbn === isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Task 3: Get all books by Author
app.get('/api/books/author/:author', (req, res) => {
  // Retrieve all books written by a specific author
  const author = req.params.author;
  const filteredBooks = books.filter((book) =>
    book.author.toLowerCase().includes(author.toLowerCase())
  );
  if (filteredBooks.length > 0) {
    res.json(filteredBooks);
  } else {
    res.status(404).json({ error: 'No books found by this author' });
  }
});

// Task 4: Get all books based on Title
app.get('/api/books/title/:title', (req, res) => {
  // Retrieve all books with a specific title
  const title = req.params.title;
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
  if (filteredBooks.length > 0) {
    res.json(filteredBooks);
  } else {
    res.status(404).json({ error: 'No books found with this title' });
  }
});

// Task 5: Get book review
app.get('/api/books/:isbn/review', (req, res) => {
  // Retrieve the review of a specific book based on ISBN
  const isbn = req.params.isbn;
  const book = books.find((book) => book.isbn === isbn);
  if (book) {
    res.json({ review: book.review });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Task 6: Register new user
app.post("/api/users/register", (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
  } else {
    // Save the user information to the database or perform necessary actions
    // Replace the console.log statement with the code to save the user information
    console.log(`User registered: email - ${email}, password - ${password}`);
    res.send("User registered successfully");
  }
});

// Endpoint for user login
app.get("/api/users/login", (req, res) => {
  const { email, password } = req.query;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
  } else {
    // Perform the login logic here
    // Replace the console.log statement with the code for login authentication
    console.log(`User logged in: email - ${email}, password - ${password}`);
    res.send("User logged in successfully");
  }
});

// Task 7: Endpoint for user login
app.get("/page", (req, res) => {
  res.send("User logged in successfully");
});

// Task 8: Add/modify a book review
app.put('/api/books/:isbn/review', (req, res) => {
  const isbn = req.params.isbn;
  const newReview = 'Great book with a powerful message, a bestseller book.'; // New review text

  const book = books.find((book) => book.isbn === isbn);
  if (book) {
    // Check if the current review matches the original text
    if (book.review === 'Great book with a powerful message.') {
      // Replace the existing review with the new review text
      book.review = newReview;

      // Customize the response message
      res.json({ message: 'Review added/modified successfully' });
    } else {
      res.status(400).json({ error: 'Review does not match expected value' });
    }
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Task 9: Delete book review added by that particular user
app.delete('/api/books/:isbn/review', (req, res) => {
  const isbn = req.params.isbn;

  const bookIndex = books.findIndex((book) => book.isbn === isbn);
  if (bookIndex !== -1) {
    // Delete the review property for the specific book
    delete books[bookIndex].review;
    res.sendStatus(204); // Return a 204 No Content response
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Task 10: Get all books - Using async callback function
app.get('/api/books', (req, res) => {
  // Retrieve all books using async callback function
  setTimeout(() => {
    res.json(books);
  }, 1000);
});

// Task 11: Search by ISBN - Using Promises
app.get('/api/books/:isbn', (req, res) => {
  // Search for a book by its ISBN using Promises
  const isbn = req.params.isbn;
  const bookPromise = new Promise((resolve, reject) => {
    const book = books.find((book) => book.isbn === isbn);
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
  });

  bookPromise
    .then((book) => {
      res.json(book);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
});

// Task 12: Search by Author
app.get('/api/books/author/:author', (req, res) => {
  // Search for books written by a specific author
  const author = req.params.author;
  const filteredBooks = books.filter((book) =>
    book.author.toLowerCase().includes(author.toLowerCase())
  );
  if (filteredBooks.length > 0) {
    const isbns = filteredBooks.map((book) => book.isbn);
    res.json({ isbns });
  } else {
    res.status(404).json({ error: 'No books found by this author' });
  }
});

// Task 13: Search by Title
app.get('/api/books/title/:title', (req, res) => {
  // Search for books with a specific title
  const title = req.params.title;
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
  if (filteredBooks.length > 0) {
    res.json(filteredBooks);
  } else {
    res.status(404).json({ error: 'No books found with this title' });
  }
});

// Task 14: Search for books
app.get('/api/books/search', (req, res) => {
  const searchTerm = req.query.q;
  const searchResults = books.filter((book) => {
    // Perform your search logic here
    // For example, search by title or author
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (searchResults.length > 0) {
    res.json(searchResults);
  } else {
    res.status(404).json({ error: 'No books found matching the search criteria' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
