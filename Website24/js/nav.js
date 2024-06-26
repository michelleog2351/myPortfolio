/* Navigation function to dynamically generate navigation menu items */
function nav() {
  $("nav").html(
    `<ul class="navbar-nav">

            <li class="nav-item">
                <a class="nav-link text-dark" href="index.html">Home</a>
            </li> 

            <li class="nav-item dropdown">
            <li class="nav-item">
                <a class="nav-link dropdown-toggle" 
                href="hobbies.html 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">My Hobbies</a>

                <ul class="dropdown-menu" aria-labelled="navbarDropdown">
                  <li><a class="dropdown-item" href="art.html">Art</a></li>
                  <li><a class="dropdown-item" href="music.html">Music</a></li>
                  <li><a class="dropdown-item" href="sports.html">Sport</a></li>
                </ul>
            </li> 

            <li class="nav-item">
                <a class="nav-link text-dark" href="contact.html">Contact</a>
            </li> 
        </ul>`
  );

  // If user is logged in...
  if (sessionStorage.getItem("login") == "true") {
    $("nav").append(
      `<ul class="navbar-nav">

                <li class="nav-item">
                    <a class="nav-link text-dark" href="admin.html">Admin</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link text-dark" href="login.html" id="logout">Logout</a>
                </li>
            </ul>`
    );
  }

  // Else append login option
  else {
    $("nav").append(
      `<ul class="navbar-nav">

                <li class="nav-item">
                    <a class="nav-link text-dark" href="login.html">Login</a>
                </li>
            </ul> `
    );
  }
}
