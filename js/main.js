const enterBtn = document.querySelector(".enter-btn");

enterBtn.addEventListener("click", () => {
  document.getElementById("timeline").scrollIntoView({
    behavior: "smooth"
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

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;

    if (top < triggerPoint) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

