// Navigation function to dynamically generate navigation menu items
function nav() {
  // Clear existing content inside nav element
  $("#nav").html("");

  // Generate navbar content
  $("#nav").html(`
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link text-dark" href="index.html">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">About</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="art.html">Art</a></li>
              <li><a class="dropdown-item" href="dance_music.html">Dance & Music</a></li>
              <li><a class="dropdown-item" href="sports.html">Sport</a></li>
              <li><a class="dropdown-item" href="books.html">Literature</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark" href="contact.html">Contact</a>
          </li>
        </ul>
      </div>
      <ul class="navbar-nav ms-auto">
        ${sessionStorage.getItem("login") == "true" ?
          `<li class="nav-item">
             <a class="nav-link text-dark" href="admin.html">Admin</a>
           </li>
           <li class="nav-item">
             <a class="nav-link text-dark" href="login.html" id="logout">Logout</a>
           </li>` :
          `<li class="nav-item">
             <a class="nav-link" href="shopping.html">
               <img src="bookImages/shopping-cart.jpg" alt="Shopping Cart Icon" class="shopping-cart">
             </a>
           </li>
           <li class="nav-item">
             <a class="nav-link text-dark" href="login.html">Login</a>
           </li>`}
      </ul>
    </div>
  `);
}

// Call nav function on document ready
$(document).ready(function() {
  nav(); // Generate initial navigation menu
});
