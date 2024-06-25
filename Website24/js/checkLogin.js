// Create an empty array to store data received from the database
var data = [];

$(document).ready(function () {
  nav();

  $("#loginButton").click(function (event) {
    event.preventDefault(); // Default action of button is to cause the page to refresh, this will stop it
    var email = $("#email").val();
    var password = $("#password").val();

    $.post(
      "http://localhost/a2/ajax/checkLogin.php",
      { email: email, password: password },
      function (data) {
        console.log(data);
        if (data.login.length == 0) {
          $("#myDiv")
            .text("**Invalid login details entered. Please try again")
            .css("color", "red");
        } else {
          sessionStorage.setItem("login", true);

          console.log(sessionStorage.getItem("login")); // Log the value stored in sessionStorage
          nav(); // Call the nav() function to update the navigation bar

          location.replace("http://localhost/a2/admin.html");
          alert("Login successful. Redirecting to Admin results page!");
        }
      },
      "json"
    ).fail(function (xhr, status, error) {
      // console.error("An error occurred during the AJAX request:", error);
      $("#myDiv").text(
        "An error occurred while processing your request. Please try again later."
      );
    });
  });
});
