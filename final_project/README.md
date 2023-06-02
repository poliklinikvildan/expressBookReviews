Coursera NODEJS Application Project 

The provided index.js code showcases a well-implemented Node.js application for setting up a RESTful API server using the Express framework. The code includes various endpoints that allow users to perform essential operations on a collection of books. Here's a description of the functionalities implemented:

Task 1: Get the book list available in the shop - This endpoint (/api/books) retrieves the list of books available, excluding the review property from the response.

Task 2: Get the books based on ISBN - This endpoint (/api/books/:isbn) retrieves a specific book based on the provided ISBN. If the book is found, it is returned in the response; otherwise, a 404 error is returned.

Task 3: Get all books by Author - This endpoint (/api/books/author/:author) retrieves all books written by a specific author. The author's name is provided as a parameter, and the matching books are returned in the response. If no books are found, a 404 error is returned.

Task 4: Get all books based on Title - This endpoint (/api/books/title/:title) retrieves all books with a specific title. The title is provided as a parameter, and the matching books are returned in the response. If no books are found, a 404 error is returned.

Task 5: Get book review - This endpoint (/api/books/:isbn/review) retrieves the review of a specific book based on the provided ISBN. If the book is found, the review is returned in the response; otherwise, a 404 error is returned.

Task 6: Register new user - This endpoint (/page) handles the registration of a new user and responds with a success message.

Endpoint for user login - This endpoint (/page) handles user login and responds with a success message.

Task 8: Add/modify a book review - This endpoint (/api/books/:isbn/review) adds or modifies the review of a specific book based on the provided ISBN. If the book is found and the current review matches the expected value, the review is replaced with a new review text, and a success message is returned. Otherwise, a 400 or 404 error is returned.

Task 9: Delete book review added by that particular user - This endpoint (/api/books/:isbn/review) deletes the review property for a specific book based on the provided ISBN. If the book is found, the review is deleted, and a 204 No Content response is returned. Otherwise, a 404 error is returned.

Task 10: Get all books - Using async callback function - This endpoint (/api/books) retrieves all books using an async callback function. It introduces a 1-second delay before returning the books in the response.

Task 11: Search by ISBN - Using Promises - This endpoint (/api/books/:isbn) searches for a book by its ISBN using Promises. If the book is found, it is returned in the response; otherwise, a 404 error is returned.

Task 12: Search by Author - This endpoint (/api/books/author/:author) searches for books written by a specific author. The author's name is provided as a parameter, and the ISBNs of the matching books are returned in the response. If no books are found, a 404 error is returned.

Task 13: Search by Title - This endpoint (/api/books/title/:title) searches for books with a specific title. The title is provided as a parameter, and the matching books are returned in the response. If no books are found, a 404 error is returned.

Task 14: Search for books - This endpoint (/api/books/search) performs a search for books based on a provided search term (q). 
The search logic checks if the search term matches the book's title or author, and the matching books are returned in the response. If no books are found, a 404 error is returned.

The server listens on port 5000, and you can interact with the API using HTTP requests and JSON data.   

The code assumes the existence of a JavaScript file named booksdb.js that exports an array of books. Make sure to have this file available or modify the code to load the book data from a different source.
