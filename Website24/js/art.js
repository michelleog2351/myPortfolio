// Create an empty array to store data received from the database
var booksData = [];
// Wait for the document to be fully loaded before executing any code
$(document).ready(function () {
  nav(); // Call the nav function to initialize navigation
  getInitialTB();
  //getBooksDD();
});

function getBooksDD() {
  var authorsSet = new Set(); // Using Set to track unique authors

  // Collect unique authors
  $.each(booksData, function (index, value) {
    authorsSet.add(value.author);
  });

  // Convert the Set to an Array and sort it
  var authorsArray = Array.from(authorsSet).sort();

  // Populate the dropdown with sorted authors
  $.each(authorsArray, function (index, author) {
    $("#books").append(
      `<option value='${author}'>${author}</option>`
    );
  });
}