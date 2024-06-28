/* Navigation function to dynamically generate navigation menu items */
function nav() {
  $("nav").html(
    `<div class="collapse navbar-collapse justify-content-center">
      <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link text-dark" href="index.html">Home</a>
        </li> 

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" 
               href="about_me.html" 
               role="button" 
               data-bs-toggle="dropdown" 
               aria-expanded="false">About</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="art.html">Art</a></li>
                <li><a class="dropdown-item" href="dance_music.html">Dance & Music</a></li>
                <li><a class="dropdown-item" href="sports.html">Sport</a></li>
            </ul>
        </li> 

        <li class="nav-item">
            <a class="nav-link text-dark" href="contact.html">Contact</a>
        </li> 
    </ul>
    </div>`
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
