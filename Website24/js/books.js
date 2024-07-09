// Create an empty array to store data received from the database
//var data = [];
var booksData = [];
// Wait for the document to be fully loaded before executing any code
$(document).ready(function () {
  nav(); // Call the nav function to initialize navigation
  getInitialTB();
  getBooksDD();
});

function getBooksDD() {

      $.each(booksData, function (index, value) {
        $("#books").append(
          `<option value='${value.author}'>${value.author}</option>`
        );
      });

      // https://www.bookstation.ie/product/georges-marvellous-medicine-2/
      // <a href="https://www.bookstation.ie/product/${value.title}-2">Info...</a>


      $("#books").change(function() 
    	{
        // call the empty() function to clear the table to prevent data being overwritten
        $("#tbody").empty();

        var thisTable = "";

        // Populate the table based on the selected team
       
           $.each(booksData, function(index, value) 
           {
            if ($("#books").val() == value.author || $("#books").val() == "All") {
              thisTable += `<tr>`;
              thisTable += `<td><img src="bookImages/${value.title}.jpg"></td>`;
              thisTable += `<td>${value.title} <br><b>${value.author}</b></td>`;
              thisTable += `<td>€${value.price}</td>`;
              thisTable += `</tr>`;
            }
           });
        
        $("#tbody").html(thisTable);
      });
    }

function getInitialTB()
	{
		// AJAX request to fetch data from the server
		$.ajax({
			url: `http://localhost/myPortfolio/Website24/json/books.json`, // URL to fetch data from
			cache: false, // NB!! Disable caching
			type: "GET", // HTTP GET method
			dataType: "json", // Expected data type
			 success: function(response) {
      // Populate booksData with fetched data
      booksData = response;
      
      // Populate initial table (#tbody) with fetched data
      var thisTable = "";
      $.each(booksData, function(index, value) {
        thisTable += `<tr>`;
        thisTable += `<td><img src="bookImages/${value.title}.jpg"></td>`;
        thisTable += `<td>${value.title} <br><b>${value.author}</b></td>`;
        thisTable += `<td>€${value.price}</td>`;
        thisTable += `</tr>`;
      });
      $("#tbody").html(thisTable); // Update the table body
    },
    error: function(xhr, status, strError) {
      $("#myDiv").text("There was an error!");
      console.log("Error: " + strError);
    }
  });
}