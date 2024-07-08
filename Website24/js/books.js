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
          // if statement firstly to check which team is selected (its value) on the dropdown to print the corresponding table using the teamID
          if($("#books").val() == value.author)
          {
            // Construct table rows for the selected county's players
            thisTable += `<tr>`;
            thisTable += `<td><img src="bookImages/${value.title}.jpg"></td>`;
            thisTable += `<td>${value.title}, <br><b>${value.author}</b></td>`;
            thisTable += `<td></td>`;
            thisTable += `</tr>`;
          // console.log(value);
          }

          // else if statement if the first option in the dropdown box is selected
          // else if($("#counties").val() == "All"){
          //   // Construct table rows for the selected team's players
          //   thisTable += `<tr>`;
          //   thisTable += `<td><img src="logos/${value.countyName}.png">${value.countyName}</td>`;
          //   thisTable += `<td>${value.playerName}(#${value.squadNumber})</td>`;
          //   thisTable += `<td>${value.age}</td>`;
          //   thisTable += `<td>${value.matches}</td>`;
          //   thisTable += `</tr>`;
          //   //console.log(value);
          // }
        })  
        $("#tbody").html(thisTable);

      });

    }

  // Callback function for AJAX error
		function errorFunc(xhr,status,strError) 
		{
			$("#myDiv").text("There was an error!");
			console.log("Error: "+ strError);
		}
}
