// Create an empty array to store data received from the database
//var artData = [];
// Wait for the document to be fully loaded before executing any code
$(document).ready(function () {
  nav(); // Call the nav function to initialize navigation
  getInitialTB();
  //getBooksDD();

  // Event listener for dropdown change
  $("#periods").change(function () {
    getInitialTB();
  });
});

function getBooksDD(artData) {
  var periodsSet = new Set();
  periodsSet.add("All");

  artData.forEach(painting => {
    periodsSet.add(painting.period);
  });

  var options = "";
        periodsSet.forEach(period => {
            options += `<option value="${period}">${period}</option>`;
        });

        $("#periods").html(options);
        console.log("Dropdown Options:", options); // Debugging line
    }

function getInitialTB()
	{
		// AJAX request to fetch data from the server
		$.ajax({
			url: `http://localhost/myPortfolio/Website24/json/art.json`, // URL to fetch data from
			cache: false, // NB!! Disable caching
			type: "GET", // HTTP GET method
			dataType: "json", // Expected data type
			 success: function(response) {
        console.log("Fetched Data:", response); // Debugging line
        
                if (response && response.paintings) {
                    // Flatten the array of paintings grouped by artist
                    const artData = response.paintings.flatMap(artistGroup => 
                        artistGroup.paintings.map(painting => ({
                            ...painting,
                            artist: artistGroup.artist
                        }))
                    );

                    // Sort by title
                    artData.sort((a, b) => a.title.localeCompare(b.title));

                    // Populate the initial table (#tbody) with fetched data
                    var thisTable = "";

        $.each(artData, function(index, value) {
                        if ($("#periods").val() == value.period || $("#periods").val() == "All") {
                            thisTable += `<tr>`;
                            thisTable += `<td><img src="pictures/art/${value.title}.jpg" alt="${value.title}"></td>`;
                            thisTable += `</tr>`;
            }
           });

      $("#tbody").html(thisTable); // Update the table body

      // Populate the dropdown menu with authors
      getBooksDD(artData);
     } else {
                    console.error("No paintings data found in response.");
                }
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