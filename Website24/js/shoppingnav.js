// Navigation function to dynamically generate navigation menu items
function ShoppingNav() {
  // Clear existing content inside nav element
  $("#shoppingnav").html("");

  // Generate navbar content
  $("#shoppingnav").html(`
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link text-dark" href="#" id="wantToReadLink">Want to Read</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark" href="#" id="checkoutLink">Checkout</a>
        </li>
      </ul>
    </div>
  `);
}

// Call nav function on document ready
$(document).ready(function() {
  nav(); // Generate initial navigation menu
});
