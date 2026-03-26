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
window.addEventListener("load", revealSections);
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

const secretBoxes = document.querySelectorAll(".secret-box");
const finalMessage = document.getElementById("finalMessage");

let unlocked = 0;

secretBoxes.forEach(box => {
  box.addEventListener("click", () => {

    if (!box.classList.contains("opened")) {
      box.classList.add("opened");
      unlocked++;
    }

    box.innerHTML = "…you found something";

    if (unlocked === secretBoxes.length) {
      finalMessage.classList.add("visible");
    }
  });
});