// Create an empty array to store data received from the database
var artData = [];
// Wait for the document to be fully loaded before executing any code
$(document).ready(function () {
  nav(); // Call the nav function to initialize navigation
  getInitialTB();
  //getBooksDD();
});

function getBooksDD() {
  var artistsSet = new Set(); // Using Set to track unique authors

  // Collect unique authors
  $.each(artData, function (index, value) {
    artistsSet.add(value.author);
  });

  // Convert the Set to an Array and sort it
  var artistsArray = Array.from(artistsSet).sort();

  // Populate the dropdown with sorted authors
  $.each(artistsArray, function (index, author) {
    $("#books").append(
      `<option value='${artist}'>${artist}</option>`
    );
  });

      // https://www.bookstation.ie/product/georges-marvellous-medicine-2/
      // <a href="https://www.bookstation.ie/product/${value.title}-2">Info...</a>


      $("#books").change(function() 
    	{
        // call the empty() function to clear the table to prevent data being overwritten
        $("#tbody").empty();

        var thisTable = "";

        // // Sort artData by title alphabetically
        // Sort artData by title alphabetically using an if statement approach
        artData.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        // artData.sort((a, b) => a.title.localeCompare(b.title));
       
           $.each(artData, function(index, value) 
           {
            if ($("#books").val() == value.period || $("#books").val() == "All") {
              thisTable += `<tr>`;
              thisTable += `<td><img src="pictures/art/${value.title}.jpg" class="book-image" data-title="${value.title}" data-author="${value.author}" data-price="${value.price.toFixed(2)}" data-description="${value.description}" data-image="bookImages/${value.title}.jpg" title="Click here to learn more about ${value.title}"></td>`;
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
			url: `http://localhost/myPortfolio/Website24/json/art/art.j`, // URL to fetch data from
			cache: false, // NB!! Disable caching
			type: "GET", // HTTP GET method
			dataType: "json", // Expected data type
			success: function(response) {
      // Populate artData with fetched data
      artData = response;
      
      // Populate initial table (#tbody) with fetched data
      var thisTable = "";

      artData.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });

      $.each(artData, function(index, value) {
        thisTable += `<tr>`;
              thisTable += `<td><img src="bookImages/${value.title}.jpg" class="book-image" data-title="${value.title}" data-author="${value.author}" data-price="${value.price.toFixed(2)}" data-description="${value.description}" data-image="bookImages/${value.title}.jpg" title="Click here to learn more about ${value.title}"></td>`;
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

      // Populate the dropdown menu with authors
      getBooksDD();
    },
    error: function(xhr, status, strError) {
      $("#myDiv").text("There was an error!");
      console.log("Error: " + strError);
    }
  });
}

// // Create an empty array to store data received from the database 
// var data = [];

// var currentRound = 1; // Keeps track of the current round
// var nextRound = 2; // Keeps track of the next round
// var prevRound = 7; // Keeps track of the previous round
// var numOfRounds = 7; // Total number of rounds

// $(document).ready(function()
// {
//    nav(); // Call the nav function to initialize navigation
//    getResults(currentRound); // Call the getResults function to fetch initial results

// 	///////// Event Handler for Next Button /////////////
// 	$("#next").click(function(event)
// 	{ 
// 		event.preventDefault(); // Prevents default action of the button

// 		/* To calculate the next round number...
// 		 * Modulo the nextRound by numOfRounds returns the remainder.
// 		 * This ensures that nextRound stays within the range of 1-7
// 		 *
// 	     * Plus 1 to increment the result
// 		 * Therefore if nextRound is at the max round, it will loop back to 1.
// 		 * i.e. 7 --> 1 
// 		 */

// 		nextRound = (nextRound % numOfRounds) + 1;
// 		currentRound = (currentRound % numOfRounds) + 1; // similar process with currentRound
// 		prevRound = (prevRound % numOfRounds) + 1; // similar process with prevRound

// 		getResults(nextRound); // Call getResults to fetch and display results for the next round
// 		roundUpdate(); // Call roundUpdate to update the round labels
// 		//console.log(currentRound);
// 	});

// 	///////// Event Handler for Previous Button ///////////
// 	$("#previous").click(function(event)
// 	{
// 		event.preventDefault();

// 		/* To calculate the previous round number...
// 		 */

// 		// Decrement current round by 1
// 		currentRound = currentRound - 1;

// 		// if the current round is less than 1, 
// 		if (currentRound < 1) 
// 		{
// 			// set back/loop back to 7 (so won't be out of range)
// 			currentRound = numOfRounds;
// 		}
	
// 		// Also we need to update the next round again
// 		nextRound = currentRound % numOfRounds + 1;
	
// 		// Calc previous round by taking away from current round
// 		prevRound = currentRound - 1;

// 		// if the prev round is less than 1, also loop back to 7 
// 		if (prevRound < 1) 
// 		{
// 			prevRound = numOfRounds;
// 		}

//         getResults(prevRound); // Call getResults to fetch and display results for the previous round
//         roundUpdate(); // Call roundUpdate to update the round labels

// 		$("#teams").trigger("keyup"); // triggers keyup()
// 		//console.log(currentRound);
// 	});

// 	});

// 	// Function to update the Round numbers on the label & buttons
// 	function roundUpdate()
// 	{
// 		$("#next").html("Round " + nextRound + " >>");
// 		$("#roundLabel").html("Round " + currentRound);
// 		$("#previous").html("<< Round " + prevRound);
// 	}

// 	// function to fetch & display results in table based on the current round
// 	function getResults()
// 	{
// 		$.getJSON(`http://localhost/a2/ajax/getResultsByRound.php?round=${currentRound}`, function(data)  
// 		{
// 			var thisTable = "";
// 			// Populate the table based on the selected team
// 			$.each(data.results, function(index, value)
// 			{
// 				thisTable += `<tr>`;
// 				thisTable += `<td>${value.date}</td>`;
// 				thisTable += `<td>${currentRound}</td>`;
//                 thisTable += `<td><img src="logos/${value.team1}.png">${value.team1}</td>`;
//                 thisTable += `<td>${value.team1Goals}-${value.team1Points}</td>`; // team points and goals
//                 thisTable += `<td>${value.team2Goals}-${value.team2Points}</td>`; // team points and goals
//                 thisTable += `<td><img src="logos/${value.team2}.png">${value.team2}</td>`;
//                 thisTable += `<td>D${value.division} Rd${currentRound}</td>`;
// 				thisTable += `</tr>`;	
// 				// console.log(value);
// 			})
// 			$("#tbody").html(thisTable);        	
// 		});
// 	}