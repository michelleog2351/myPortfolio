// Wait for the document to be fully loaded before executing any code
$(document).ready(function () {
  nav(); // Call the nav function to initialize navigation

  $("#contactForm").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    var fName = $("#firstName").val();
    var lName = $("#lastName").val();
    var email = $("#email").val();
    // var password = $("#password").val();

    if (fName && lName && email) {
      alert(`First Name: " ${fName} Last Name: " + lName + "Email: " + email`);
      $("#contactModal").modal("hide"); // Hide the modal after showing the alert
    } else {
      alert("Please fill in all fields.");
    }
  });
});
