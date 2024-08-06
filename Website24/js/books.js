$(window).on('load', function () {
        // Extra delay (optional)
        setTimeout(function() {
          $('.buttonload').html('Loaded'); // Change button text after loading
        }, 5000); // Additional delay after all resources are loaded
      });

$(document).ready(function () {
  nav(); // Call the nav function to initialize navigation
  
  getInitialTB();
  AddToRead();
  WantToBuy();
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

      // https://www.bookstation.ie/product/georges-marvellous-medicine-2/
      // <a href="https://www.bookstation.ie/product/${value.title}-2">Info...</a>


      $("#books").change(function() 
    	{
        // call the empty() function to clear the table to prevent data being overwritten
        $("#tbody").empty();

        var thisTable = "";

        // // Sort booksData by title alphabetically
        // Sort booksData by title alphabetically using an if statement approach
        booksData.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        // booksData.sort((a, b) => a.title.localeCompare(b.title));
       
           $.each(booksData, function(index, value) 
           {
            if ($("#books").val() == value.author || $("#books").val() == "All") {
              thisTable += `<tr>`;
              thisTable += `<td><img src="bookImages/${value.title}.jpg" class="book-image" data-title="${value.title}" data-author="${value.author}" data-price="${value.price.toFixed(2)}" data-description="${value.description}" data-image="bookImages/${value.title}.jpg" title="Click here to learn more about ${value.title}"></td>`;
              thisTable += `<td>${value.title} <br><b>${value.author}</b></td>`;
              thisTable += `<td><button class="btn btn-success buy-button" data-title="${value.title}">BUY | €${value.price.toFixed(2)}</button></td>`;
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

function AddToRead()
{
  $("#readButton").click(function()
  {
    var image1 = "bookImages/readBook.jpg";
    $("#addBook").attr("src", image1); 

    // Show the Bootstrap modal
     $("#cartModal").modal('show');
  }
  );
}

function WantToBuy()
{
   // Attach click event to the buy buttons
    $(".btn btn-success buy-button").click(function() {
      let bookTitle = $(this).data("title");
      // Handle the book purchase action here
      alert("You clicked buy for: " + bookTitle);
      // Example: Redirect to a purchase page or show a modal
      // window.location.href = `purchase.html?title=${bookTitle}`;
      // Or display a modal for purchasing
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

      booksData.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });

      $.each(booksData, function(index, value) {
        thisTable += `<tr>`;
              thisTable += `<td><img src="bookImages/${value.title}.jpg" class="book-image" data-title="${value.title}" data-author="${value.author}" data-price="${value.price.toFixed(2)}" data-description="${value.description}" data-image="bookImages/${value.title}.jpg" title="Click here to learn more about ${value.title}"></td>`;
              thisTable += `<td>${value.title} <br><b>${value.author}</b></td>`;
              thisTable += `<td><button class="btn btn-success buy-button" data-title="${value.title}">BUY | €${value.price.toFixed(2)}</button></td>`;
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

      // Populate the dropdown menu with authors
      getBooksDD();
    },
    error: function(xhr, status, strError) {
      $("#myDiv").text("There was an error!");
      console.log("Error: " + strError);
    }
  });
}