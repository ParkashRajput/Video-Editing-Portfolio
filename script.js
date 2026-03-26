// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});

// Close mobile menu
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("open");
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe fade-in elements
document.querySelectorAll(".fade-in-up").forEach((el) => {
  observer.observe(el);
});

// Section indicator
const sections = document.querySelectorAll("section[id]");
const sectionDots = document.querySelectorAll(".section-dot");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");

        sectionDots.forEach((dot) => {
          dot.classList.remove("active");
          if (dot.dataset.section == sectionId) {
            dot.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Section dot click
sectionDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const sectionId = dot.dataset.section;
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Skill bars animation
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.style.width;

      bar.style.width = "0%";

      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    }
  });
}, observerOptions);

skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

// Page load animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Navbar background on scroll
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.2)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.9)";
  }
});

// 🔥 FIXED VIDEO HOVER LOGIC (CRITICAL FIX)
document.querySelectorAll(".glass-morphism").forEach((card) => {

  card.addEventListener("mouseenter", () => {
    const video = card.querySelector("video"); // moved inside

    if (video) {
      video.currentTime = 0;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {}); // prevent errors
      }
    }
  });

  card.addEventListener("mouseleave", () => {
    const video = card.querySelector("video"); // moved inside

    if (video) {
      video.pause();
    }
  });

});

// 🔥 FORCE VIDEO INITIALIZATION (helps last card issue)
document.querySelectorAll("video").forEach((video) => {
  video.load();
});

// Mute button
document.querySelectorAll(".mute-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const muteIcon = button.querySelector(".muted");
    const unmuteIcon = button.querySelector(".unmuted");

    const video = button.closest(".glass-morphism")?.querySelector("video");

    if (video) {
      video.muted = !video.muted;
      muteIcon.classList.toggle("hidden");
      unmuteIcon.classList.toggle("hidden");
    }
  });
});

// Video orientation detection
document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".video-wrapper");

  wrappers.forEach((wrapper) => {
    const video = wrapper.querySelector("video");
    if (!video) return;

    const setOrientation = () => {
      const w = video.videoWidth || 1;
      const h = video.videoHeight || 1;

      wrapper.classList.remove("landscape", "portrait", "square");

      if (w > h) wrapper.classList.add("landscape");
      else if (h > w) wrapper.classList.add("portrait");
      else wrapper.classList.add("square");
    };

    if (video.readyState >= 1) {
      setOrientation();
    } else {
      video.addEventListener("loadedmetadata", setOrientation, { once: true });
    }
  });
});