// Core functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize core modules
  initializeSlider();
  initializeMobileMenu();
  initializeSmoothScroll();
  initializeFormValidation();
  initializeImageLoading();
});

// Slider functionality
function initializeSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentSlide = 0;
  const slideCount = slides.length;
  const slideInterval = 5000;
  let autoSlideInterval;

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
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
      slide.style.transform =
        index === currentSlide ? "scale(1)" : "scale(1.05)";
      slide.style.opacity = index === currentSlide ? "1" : "0";
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    updateSlider();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideInterval);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Initialize slider
  updateSlider();
  startAutoSlide();

  // Event listeners
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > swipeThreshold) {
        goToSlide(currentSlide + (difference > 0 ? 1 : -1));
      }
      startAutoSlide();
    },
    { passive: true }
  );
}

// Mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");

  if (!mobileMenu) return;

  function toggleMobileMenu(show) {
    mobileMenu.classList.toggle("active", show);
    mobileMenuOverlay.style.display = show ? "block" : "none";
    document.body.style.overflow = show ? "hidden" : "";
  }

  mobileMenuBtn?.addEventListener("click", () => toggleMobileMenu(true));
  mobileMenuClose?.addEventListener("click", () => toggleMobileMenu(false));
  mobileMenuOverlay?.addEventListener("click", () => toggleMobileMenu(false));

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMobileMenu(false));
  });
}

// Smooth scroll functionality
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Form validation
function initializeFormValidation() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector("textarea").value;

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    alert("Thank you for your message! We will get back to you soon.");
    form.reset();
  });
}

// Image loading optimization
function initializeImageLoading() {
  // Add loading animation to images
  document.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.style.opacity = "0";
      img.addEventListener("load", () => {
        img.style.transition = "opacity 0.5s ease";
        img.style.opacity = "1";
      });
      // Add error handling
      img.addEventListener("error", () => {
        console.warn(`Failed to load image: ${img.src}`);
        img.style.opacity = "1"; // Show the image even if it fails to load
      });
    }
  });

  // Lazy loading
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Only update src if data-src exists
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      // Only observe images that have a data-src attribute
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }
}
