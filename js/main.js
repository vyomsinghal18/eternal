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

const albumCards = document.querySelectorAll(".album-card");

albumCards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

/* Timeline Item Toggle */
const timelineItems = document.querySelectorAll(".timeline-item");

timelineItems.forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
