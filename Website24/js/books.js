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
              thisTable += `<td><img src="bookImages/${value.title}.jpg" class="book-image" data-title="${value.title}" data-author="${value.author}" data-price="${value.price.toFixed(2)}" data-description="${value.description}" data-image="bookImages/${value.title}.jpg" title="Click to view details"></td>`;
              thisTable += `<td>${value.title} <br><b>${value.author}</b></td>`;
              thisTable += `<td>€${value.price.toFixed(2)}</td>`;
              thisTable += `</tr>`;
            }
           });
        
        $("#tbody").html(thisTable);

      // Attach click event to images
      $(".book-image").click(function() {
        var title = $(this).data("title");
        var author = $(this).data("author");
        var price = $(this).data("price");
        var description = $(this).data("description");
        var image = $(this).data("image");

        // Update modal content
        $("#modalTitle").text(title);
        $("#modalAuthor").html(`<a href="https://www.google.com/search?q=${author}" target="_blank">${author}></a>`);
        $("#modalPrice").text("€" + price);
        $("#modalDesc").text(description);
        $("#modalImage").attr("src", image); 

      // Show the modal
      $("#bookModal").modal('show');
    });
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
              thisTable += `<td><img src="bookImages/${value.title}.jpg" class="book-image" data-title="${value.title}" data-author="${value.author}" data-price="${value.price.toFixed(2)}" data-description="${value.description}" data-image="bookImages/${value.title}.jpg" title="Click to view details"></td>`;
              thisTable += `<td>${value.title} <br><b>${value.author}</b></td>`;
              thisTable += `<td>€${value.price.toFixed(2)}</td>`; 
              thisTable += `</tr>`;
      });
      $("#tbody").html(thisTable); // Update the table body

       // Attach click event to images
      $(".book-image").click(function() {
        var title = $(this).data("title");
        var author = $(this).data("author");
        var price = $(this).data("price");
        var description = $(this).data("description");
        var image = $(this).data("image");

        // Update modal content
        $("#modalTitle").text(title);
        $("#modalAuthor").html(`<a href="https://www.google.com/search?q=${author}" target="_blank">${author}></a>`);
        $("#modalPrice").text("€" + price);
        $("#modalDesc").text(description);
        $("#modalImage").attr("src", image); 

        // Show the modal
        $("#bookModal").modal('show');
      });
    },
    error: function(xhr, status, strError) {
      $("#myDiv").text("There was an error!");
      console.log("Error: " + strError);
    }
  });
}