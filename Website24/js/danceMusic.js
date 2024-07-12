$(document).ready(function () {
  nav(); // Call the nav function to initialize navigation

  const $carouselElement = $('#carouselSlides');
  const $pauseButton = $('#pauseButton');
  let isPaused = false;
  let autoSlideTimer; // Timer variable for automatic sliding

  // Start the automatic sliding timer
  startAutoSlideTimer();

  // Function to start the automatic sliding timer
  function startAutoSlideTimer() {
    autoSlideTimer = setTimeout(function () {
      if (!isPaused) {
        $carouselElement.carousel('next');
      }
      startAutoSlideTimer(); // Restart the timer
    }, 4000); // 4000 milliseconds = 5 seconds
  }

  // Event listener for carousel slide start
  $carouselElement.on('slide.bs.carousel', function () {
    clearTimeout(autoSlideTimer); // Clear the timer when user interacts with arrows
    isPaused = true; // Set isPaused to true when slide event starts
  });

  // Event listener for pause button click
  $pauseButton.on('click', function () {
    if (isPaused) {
      $carouselElement.carousel('cycle');
      $pauseButton.html(`
        <span class="visually-hidden">Pause</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
          <path d="M5.5 3.5A1.5 1.5 0 1 1 4 5v6a1.5 1.5 0 1 1 1.5-1.5V3.5zM10.5 3.5A1.5 1.5 0 1 1 9 5v6a1.5 1.5 0 1 1 1.5-1.5V3.5z"/>
        </svg>
      `);
      isPaused = false; // Update isPaused state
      startAutoSlideTimer(); // Restart automatic sliding
    } else {
      $carouselElement.carousel('pause');
      $pauseButton.html(`
        <span class="visually-hidden">Play</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
          <path d="M6 3.5v9l6-4.5-6-4.5z"/>
        </svg>
      `);
      clearTimeout(autoSlideTimer); // Clear the automatic sliding timer
      isPaused = true; // Update isPaused state
    }
  });

  // Handle arrow buttons to stop automatic cycling
  $('.round-button[data-bs-slide]').on('click', function () {
    if (!isPaused) {
      $carouselElement.carousel('pause'); // Pause carousel when arrow buttons are clicked
      isPaused = true; // Set isPaused to true when arrow buttons are clicked
      clearTimeout(autoSlideTimer); // Clear the timer to prevent automatic sliding
    }
  });
});
