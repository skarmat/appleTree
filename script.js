document.addEventListener("DOMContentLoaded", function () {
  // Hero Slider Setup
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  let currentSlide = 0;
  const slideCount = slides.length;
  const slideInterval = 5000; // Change slide every 5 seconds
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
    // Update slides with smooth transitions
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add("active");
        slide.style.transform = "scale(1)";
        slide.style.opacity = "1";
      } else {
        slide.classList.remove("active");
        slide.style.transform = "scale(1.05)";
        slide.style.opacity = "0";
      }
    });

    // Update dots
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

  // Pause on hover
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  // Mobile touch support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    },
    false
  );

  slider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    },
    false
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        // Swipe left - next slide
        goToSlide(currentSlide + 1);
      } else {
        // Swipe right - previous slide
        goToSlide(currentSlide - 1);
      }
    }
  }

  // Navigation scroll behavior
  let lastScrollY = window.scrollY;
  let lastScrollTime = Date.now();
  const scrollThreshold = 100; // minimum scroll distance to trigger header
  const timeThreshold = 150; // minimum time between scrolls to consider "stopped" scrolling

  function handleScroll() {
    const nav = document.querySelector(".nav");
    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    const timeDiff = currentTime - lastScrollTime;
    const scrollingUp = currentScrollY < lastScrollY;

    // Show header only when scrolling down and past threshold
    if (
      currentScrollY > scrollThreshold &&
      !scrollingUp &&
      Math.abs(currentScrollY - lastScrollY) > 0
    ) {
      nav.classList.add("visible");
      lastScrollTime = currentTime;
    }
    // Hide header when scrolling up, stopped scrolling, or near top
    else if (
      scrollingUp ||
      timeDiff > timeThreshold ||
      currentScrollY <= scrollThreshold
    ) {
      nav.classList.remove("visible");
    }

    lastScrollY = currentScrollY;
  }

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
    mobileMenuOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.style.display = "none";
    document.body.style.overflow = "";
  }

  mobileMenuBtn.addEventListener("click", openMobileMenu);
  mobileMenuClose.addEventListener("click", closeMobileMenu);
  mobileMenuOverlay.addEventListener("click", closeMobileMenu);

  // Close mobile menu when clicking a link
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  // Scroll Animation
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe elements with animation
  document.querySelectorAll(".hover-scale").forEach((el) => {
    observer.observe(el);
  });

  // Form Validation
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const message = form.querySelector("textarea").value;

      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Here you would typically send the form data to a server
      alert("Thank you for your message! We will get back to you soon.");
      form.reset();
    });
  }

  // Add loading animation to images
  document.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.style.opacity = "0";
      img.addEventListener("load", () => {
        img.style.transition = "opacity 0.5s ease";
        img.style.opacity = "1";
      });
    }
  });

  // Image lazy loading
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger load
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // Optimize slider performance
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Start slider
  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Pause slider on hover
  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener("mouseleave", startSlider);

  // Initialize slider
  startSlider();

  // Mobile menu optimization
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("active");
    mobileMenuOverlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  mobileMenuClose.addEventListener("click", toggleMobileMenu);
  mobileMenuOverlay.addEventListener("click", toggleMobileMenu);

  // Smooth scroll optimization
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        if (mobileMenu.classList.contains("active")) {
          toggleMobileMenu();
        }
      }
    });
  });
});
