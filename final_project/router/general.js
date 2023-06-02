const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Endpoint for user registration (POST /register)
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Check if the username is valid
  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  // Add the new user to the users array
  users.push({ username, password });

  // Return a success message
  return res.status(200).json({ message: "User registered successfully" });
});

// Get the book list available in the shop (GET /)
public_users.get('/', function (req, res) {
  // Retrieve all book titles
  const bookTitles = Object.values(books).map((book) => book.title);

  // Return the book titles in the response
  return res.status(200).json({ books: bookTitles });
});

// Get book details based on ISBN (GET /isbn/:isbn)
public_users.get('/isbn/:isbn', function (req, res) {
  const { isbn } = req.params;

  // Find the book with the given ISBN
  const book = books[isbn];

  // Check if the book exists
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Return the book details in the response
  return res.status(200).json({ book });
});

// Get book details based on author (GET /author/:author)
public_users.get('/author/:author', function (req, res) {
  const { author } = req.params;

  // Filter books based on the author
  const filteredBooks = Object.values(books).filter(
    (book) => book.author === author
  );

  // Return the filtered books in the response
  return res.status(200).json({ books: filteredBooks });
});

module.exports.general = public_users;
