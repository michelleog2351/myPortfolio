// Create an empty array to store data received from the database
var data = [];
var book1 = 1;

// Wait for the document to be fully loaded before executing any code
$(document).ready(function () {
  nav(); // Call the nav function to initialize navigation
  getBooksDD();
});

function getBooksDD() {
  $.getJSON(`https://localhost:8000/json/books.json`, function (data) {
    $.each(data.books, function (index, value) {
      $("#books").append(
        `<option value='${value.title}'>${value.title}</option>`
      );
    });
  });
}
