"use strict";

// PRELOADER
const loadingDots = document.querySelector("[data-preload]");
window.addEventListener("load", function () {
  setTimeout(() => {
    loadingDots.style.display = "none";
  }, 900);
});

// Scroll to top when logo is clicked
const logo = document.querySelector("svg");

logo.addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});

// Function to calculate age
const year = (document.querySelector(".year").textContent =
  new Date().getFullYear());

const infodetailsAge = document.querySelector(".info-details.age");
function calcAge() {
  const year = new Date().getFullYear();
  const birthYear = 1998;
  return year - birthYear;
}

infodetailsAge.textContent = calcAge();

// TYPING ANIMATION
var typed = new Typed(".typing", {
  strings: ["Frontend Dev", "Web Designer", "Freelancer", "Programmer"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
  backDelay: 1500,
});

// ---- Active section in navigation links ---- //
document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".main-nav-link");

  // Default to Home active when at the top
  if (scrollY === 0) {
    navLinks.forEach((link) => link.classList.remove("active"));

    navLinks[0].classList.add("active"); // Home link
    return;
  }

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 50 && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });
});

function handleNavClick(e) {
  e.preventDefault();

  if (
    e.target.classList.contains("main-nav-link") ||
    e.target.classList.contains("sidebar-nav-link") ||
    e.target.id === "go-to-contact"
  ) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }

  if (e.target.classList.contains("sidebar-nav-link")) {
    sideBar.classList.remove("active");
    overlay.classList.remove("active");
  }
}

// Handle nav clicks
const mainNavList = document.querySelector(".main-nav-lists");
const sidebarNavLists = document.querySelector(".sidebar-nav-lists");

// Scroll to section when the nav-link is clicked
mainNavList.addEventListener("click", (e) => {
  handleNavClick(e);
});

// Scroll to section when the sidebar-link is clicked & close side bar
sidebarNavLists.addEventListener("click", (e) => handleNavClick(e));

// go-to-contact
const goToContact = document.querySelector("#go-to-contact");

goToContact.addEventListener("click", (e) => {
  handleNavClick(e);
});

// Toggle Sidebar (Mobile)
const mobileTogglers = document.querySelectorAll("[data-nav-toggler]");
const sideBar = document.querySelector(".side-bar");
const overlay = document.querySelector(".overlay");

mobileTogglers.forEach((mobileToggler) => {
  mobileToggler.addEventListener("click", function () {
    sideBar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
});

// Sticky Navigation
const header = document.querySelector(".header");
const headerHeight = header.getBoundingClientRect().height;
const backTopBtn = document.querySelector(".back-top-btn");

backTopBtn.addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});

const headerActive = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
      } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
      }
    });
  }
};

const headerObserver = new IntersectionObserver(headerActive, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

headerObserver.observe(header);

// ---- Implement scroll section into view ---- //

const sections = document.querySelectorAll(".section");
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
  section.classList.add("hidden");
});

// ---- Animate elements on scroll ---- //

const aboutSection = document.querySelector("#about");
const aboutImg = document.querySelector(".about-img");
const funFacts = document.getElementById("fun-facts");
const educationContainer = document.querySelector(".education-container");
const educationImg = document.querySelector(".education-img");
const serviceWrapper = document.querySelector(".service-wrapper");
const serviceLists = document.querySelectorAll(".service-list");
const contactWrapper = document.querySelector(".contact-wrapper");
const contactForm = document.querySelector(".contact-form");

const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target === aboutSection) {
        aboutImg.classList.add("animate");
      } else if (entry.target === funFacts) {
        funFacts.classList.add("visible");
      } else if (entry.target === educationContainer) {
        educationImg.classList.add("active");
      } else if (entry.target === serviceWrapper) {
        serviceLists.forEach((serviceList) => {
          serviceList.classList.add("active");
        });
      } else if (entry.target === contactWrapper) {
        contactForm.classList.add("active");
      }
    } else {
      if (entry.target === aboutSection) {
        aboutImg.classList.remove("animate");
      } else if (entry.target === funFacts) {
        funFacts.classList.remove("visible");
      } else if (entry.target === educationContainer) {
        educationImg.classList.remove("active");
      } else if (entry.target === serviceWrapper) {
        serviceLists.forEach((serviceList) => {
          serviceList.classList.remove("active");
        });
      } else if (entry.target === contactWrapper) {
        contactForm.classList.remove("active");
      }
    }
  });
};

const aboutObserver = new IntersectionObserver(handleIntersection, {
  rootMargin: "50px",
  threshold: 0.1,
});

aboutObserver.observe(aboutSection);
aboutObserver.observe(funFacts);
aboutObserver.observe(educationContainer);
aboutObserver.observe(serviceWrapper);
aboutObserver.observe(contactWrapper);

// Apply initial styles on page load for initially visible sections
const checkInitialVisibility = () => {
  if (
    aboutSection &&
    window.innerHeight > aboutSection.getBoundingClientRect().top + 50
  ) {
    aboutImg.classList.add("animate");
  }
  if (
    funFacts &&
    window.innerHeight > funFacts.getBoundingClientRect().top + 50
  ) {
    funFacts.classList.add("visible");
  }
  if (
    educationContainer &&
    window.innerHeight > educationContainer.getBoundingClientRect().top + 50
  ) {
    educationImg.classList.add("active");
  }
  if (
    serviceWrapper &&
    window.innerHeight > serviceWrapper.getBoundingClientRect().top + 50
  ) {
    serviceLists.forEach((serviceList) => {
      serviceList.classList.add("active");
    });
  }
  if (
    contactWrapper &&
    window.innerHeight > contactWrapper.getBoundingClientRect().top + 50
  ) {
    contactForm.classList.add("active");
  }
};

// Call the function on page load
window.addEventListener("load", checkInitialVisibility);

// ---- Animate Fun-facts data ---- //
const numberElements = document.querySelectorAll(".data");

// Function to extract and parse the number
function parseNumber(text) {
  if (text.includes("K")) {
    return parseFloat(text) * 1000;
  } else if (text.includes("+")) {
    return parseInt(text);
  } else {
    return parseInt(text);
  }
}

// Function to animate the numbers
function animateNumber(element) {
  const text = element.textContent;
  const targetNumber = parseNumber(text);
  let currentNumber = 0;
  const duration = 2000;
  const increment = Math.ceil(targetNumber / (duration / 16)); // Approximate frames per second

  const interval = setInterval(() => {
    if (targetNumber > 1000 && currentNumber < targetNumber * 0.5) {
      currentNumber = targetNumber * 0.5;
      element.textContent = (currentNumber / 1000).toFixed(0) + "K"; // Skip to 50% and display with 'K'
    } else if (targetNumber > 1000 && currentNumber < targetNumber) {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        if (text.includes("K")) {
          element.textContent = (targetNumber / 1000).toFixed(0) + "K";
        } else if (text.includes("+")) {
          element.textContent = text;
        } else {
          element.textContent = targetNumber;
        }
        clearInterval(interval);
      } else {
        element.textContent = (currentNumber / 1000).toFixed(0) + "K";
      }
    } else {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        if (text.includes("K")) {
          element.textContent = (targetNumber / 1000).toFixed(0) + "K";
        } else if (text.includes("+")) {
          element.textContent = text;
        } else {
          element.textContent = targetNumber;
        }
        clearInterval(interval);
      } else {
        element.textContent = currentNumber;
      }
    }
  }, 16);
}

const funfactObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateNumber(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

numberElements.forEach((element) => {
  funfactObserver.observe(element);
});

// ---- Open & Close popup site ---- //
const popupSites = document.querySelectorAll(".popup-site");

const closePopup = document.querySelectorAll("[data-close-popup]");
const portfolioLinkBtns = document.querySelectorAll(".portfolio-link");
const popupOverlay = document.querySelector(".popup-overlay");
const body = document.querySelector("body");

closePopup.forEach((element) => {
  element.addEventListener("click", () => {
    popupSites.forEach((popup) => {
      popup.classList.remove("active");
    });

    popupOverlay.classList.remove("active");
    body.classList.remove("bg-hidden");
  });
});

portfolioLinkBtns.forEach((linkBtn) => {
  linkBtn.addEventListener("click", function (e) {
    popupSites.forEach((popup) => {
      if (e.target.dataset.popupOpen === popup.dataset.popupOpen) {
        popup.classList.add("active");
      }
    });
    popupOverlay.classList.add("active");
    body.classList.add("bg-hidden");
  });
});

// ---- Animate progress circle on scoll view ---- //
const progressWrappers = document.querySelectorAll(
  ".progress-circle-container"
);

const skillProgressWrapper = document.querySelector(".skill-progress-wrapper");

function animateProgress(wrapper) {
  const progressBar = wrapper.querySelector(".progress-outer-circle");
  const percentageDisplay = wrapper.querySelector(".percent-text");
  const targetPercent = parseInt(wrapper.dataset.percent);
  let currentPercent = 0;
  const speed = 20;

  const interval = setInterval(() => {
    if (currentPercent <= targetPercent) {
      const angle = (currentPercent / 100) * 360;
      progressBar.style.setProperty("--progress-angle", `${angle}deg`);
      progressBar.style.background = `conic-gradient(#80db66 0%, #80db66 ${angle}deg, #d9e1e2 ${angle}deg)`;
      percentageDisplay.textContent = `${currentPercent}%`;
      currentPercent++;
    } else {
      clearInterval(interval);
      progressBar.dataset.animated = true;
    }
  }, speed);
}

function handleintersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      skillProgressWrapper.classList.add("visible");

      progressWrappers.forEach((wrapper) => {
        if (!wrapper.querySelector(".progress-outer-circle").dataset.animated) {
          animateProgress(wrapper);
        }
      });
      observer.unobserve(entry.target);
    }
  });
}

const progressObserver = new IntersectionObserver(handleintersection, {
  threshold: 0.1,
});

// const skillArea = document.querySelector(".skill-area");
if (skillProgressWrapper) {
  progressObserver.observe(skillProgressWrapper);
}

// ---- Testimonial slider ---- //
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider-btn-left");
  const btnRight = document.querySelector(".slider-btn-right");
  const dotContainer = document.querySelector(".dots");
  const sliderInterval = 7000;

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots-dot")
      .forEach((dot) => dot.classList.remove("dots-dot-active"));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add("dots-dot-active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Prev Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };

  init();

  // autoSlide
  const autoSlide = function () {
    setInterval(nextSlide, sliderInterval);
  };

  autoSlide();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots-dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

// Handle form submissions
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const formMessages = document.getElementById("form-messages");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Disable the submit button to prevent multiple submissions
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (response.ok) {
          formMessages.classList.remove("error");
          formMessages.classList.add("success");
          formMessages.textContent = "Thank you for your message!";
          form.reset(); // Clear the form
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        formMessages.classList.remove("success");
        formMessages.classList.add("error");
        formMessages.textContent =
          "Oops! Something went wrong. Please try again.";
      })
      .finally(() => {
        // Re-enable the submit button
        submitButton.disabled = false;
        submitButton.textContent = "SUBMIT NOW";
      });
  });
});

// Initialize map with leaflet.js
const arrCoords = [4.8668825, 6.8572762];
const map = L.map("map").setView(arrCoords, 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const myIcon = L.icon({
  iconUrl: "Images/map-marker.png",
});

const marker = L.marker(arrCoords, {
  icon: myIcon,
}).addTo(map);
