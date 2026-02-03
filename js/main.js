const enterBtn = document.querySelector(".enter-btn");

enterBtn.addEventListener("click", () => {
  document.getElementById("timeline").scrollIntoView({
    behavior: "smooth"
  });
});

const nextButtons = document.querySelectorAll(".next-btn");

nextButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-next");
    document.querySelector(target).scrollIntoView({
      behavior: "smooth"
    });
  });
});

const chaosLayers = document.querySelectorAll(".chaos");

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function applyChaos() {
  chaosLayers.forEach(layer => {
    const x = randomFloat(-300, 300);
    const y = randomFloat(-200, 100);
    const duration = randomFloat(12, 30);

    layer.style.transitionDuration = `${duration}s`;
    layer.style.setProperty("--x", `${x}px`);
    layer.style.setProperty("--y", `${y}px`);
  });
}

// Initial motion
applyChaos();

// Re-randomize endlessly
setInterval(applyChaos, 25000);

const fadeSections = document.querySelectorAll(".fade-section");

const revealSections = () => {
  fadeSections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;

    if (top < triggerPoint) {
      section.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealSections);
revealSections();

/* Album Card Toggle */
const albumCards = document.querySelectorAll(".album-card");

albumCards.forEach(card => {
  card.addEventListener("click", () => {
    albumCards.forEach(c => {
      if (c !== card) c.classList.remove("active");
    });
    card.classList.toggle("active");
  });
});

/* Album Card Long Press for Secret Message */
let pressTimer;

albumCards.forEach(card => {
  card.addEventListener("touchstart", () => {
    pressTimer = setTimeout(() => {
      card.classList.add("secret");
    }, 800);
  });

  card.addEventListener("touchend", () => {
    clearTimeout(pressTimer);
    card.classList.remove("secret");
  });
});



/* Timeline Item Toggle */
const timelineItems = document.querySelectorAll(".timeline-item");

timelineItems.forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

const overlay = document.getElementById("carouselOverlay");
const closeBtn = document.getElementById("closeCarousel");
const categoryCards = document.querySelectorAll(".album-category");

let embla;

categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    overlay.classList.add("active");

    if (!embla) {
      embla = EmblaCarousel(document.querySelector(".embla"), {
        loop: false
      });
    }
  });
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});

/* Album Category Carousel */
const overlay = document.getElementById("carouselOverlay");
const closeBtn = document.getElementById("closeCarousel");
const categoryCards = document.querySelectorAll(".album-category");

let embla;

categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    overlay.classList.add("active");

    if (!embla) {
      embla = EmblaCarousel(document.querySelector(".embla"), {
        loop: false
      });
    }
  });
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});
