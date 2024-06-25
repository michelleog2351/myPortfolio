$(document).ready(function () {
  $("#logout").click(function (event) {
    event.preventDefault(); // Prevent default link behavior
    sessionStorage.removeItem("login");
    nav();
    location.replace("Website24/login.html");
  });
});
