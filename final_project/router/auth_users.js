// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");

// Create a new router instance
const regd_users = express.Router();

// Define an array to store registered users
let users = [];

// Function to check if a username is valid
const isValid = (username) => {
  // Write code to check if the username is valid
  // For example, you could check if it meets certain criteria
  // Return a boolean value indicating the result
};

// Function to check if a username and password match the records
const authenticatedUser = (username, password) => {
  // Write code to check if the username and password match the records
  // For example, you could compare them with a database or stored data
  // Return a boolean value indicating the result
};

// Endpoint for user login (POST /login)
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username is valid
  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  // Check if the username and password match the records
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ username }, "secretkey");

  // Return the token in the response
  return res.status(200).json({ token });
});

// Endpoint to add a book review (PUT /auth/review/:isbn)
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;

  // Find the book with the given ISBN in the books database
  const book = books.find((book) => book.isbn === isbn);

  // Check if the book exists
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Add the review to the book's reviews array
  book.reviews.push(review);

  // Return a success message
  return res.status(200).json({ message: "Review added successfully" });
});

// Export the router, isValid function, and users array
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
