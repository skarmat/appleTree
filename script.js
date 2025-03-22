document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");

  let currentSlide = 0;
  const slideCount = slides.length;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateSlider() {
    // Update slides
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }

  // Start auto-sliding immediately
  let slideInterval = setInterval(nextSlide, 3000);

  // Pause on hover
  slider.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 3000);
  });

  // Initial update
  updateSlider();

  // Navigation scroll behavior
  const nav = document.querySelector(".nav");

  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  // Initial check
  handleScroll();

  // Add scroll event listener with throttling
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile Menu Functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");

  function openMobileMenu() {
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileMenuBtn.addEventListener("click", openMobileMenu);
  mobileMenuClose.addEventListener("click", closeMobileMenu);
  mobileMenuOverlay.addEventListener("click", closeMobileMenu);

  // Close mobile menu when clicking a link
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
});
