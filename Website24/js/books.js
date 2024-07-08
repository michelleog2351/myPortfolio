// Create an empty array to store data received from the database

// Wait for the document to be fully loaded before executing any code
$(document).ready(function () {
  nav(); // Call the nav function to initialize navigation
  getBooksDD();
});

function getBooksDD() {

  // AJAX request to fetch data from the server
		$.ajax({
			url: `http://localhost/myPortfolio/Website24/json/books.json`, // URL to fetch data from
			cache: false, // NB!! Disable caching
			type: "GET", // HTTP GET method
			dataType: "json", // Expected data type
			success: successFunc, // Callback function to handle successful response
			error: errorFunc // Callback function to handle error
		});

    function successFunc(booksData)
		{
      $.each(booksData, function (index, value) {
        $("#books").append(
          `<option value='${value.title}'>${value.title}</option>`
        );
      });

    }

  // Callback function for AJAX error
		function errorFunc(xhr,status,strError) 
		{
			$("#myDiv").text("There was an error!");
			console.log("Error: "+ strError);
		}
}
