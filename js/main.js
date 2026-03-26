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

const naughtyBox = document.getElementById("secret2");

naughtyBox.addEventListener("mouseenter", () => {
  naughtyBox.style.transform = "translateX(10px)";
});

naughtyBox.addEventListener("mouseleave", () => {
  naughtyBox.style.transform = "translateX(0)";
});

function moveRandomly(element) {
  return new Promise(resolve => {
    const x = (Math.random() - 0.5) * 80; // -40px to +40px
    const y = (Math.random() - 0.5) * 80;

    element.style.transform = `translate(${x}px, ${y}px)`;

    setTimeout(resolve, 250);
  });
}

let moving = false;

function startMoving(element) {
  moving = true;

  function move() {
    if (!moving) return;

    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;

    element.style.transform = `translate(${x}px, ${y}px)`;

    // pause briefly so it's tappable
    setTimeout(() => {
      if (moving) move();
    }, 500); // 👈 sweet spot (not too hard, not too easy)
  }

  move();
}

const secretBoxes = document.querySelectorAll(".secret-box");
const finalMessage = document.getElementById("finalMessage");

let unlocked = 0;
let movingBox = null;

const playfulTexts = [
  "I told you not to 😌",
  "You don’t listen, do you?",
  "Okay… that was expected",
  "Curiosity suits you"
];

secretBoxes.forEach((box, index) => {
  box.addEventListener("click", () => {

    // If it's the moving box → STOP it
    if (box === movingBox && moving) {
      moving = false;
      box.style.transform = "translate(0, 0)";
      box.innerHTML = "okay… you got me 😄";

      setTimeout(() => {
        finalMessage.classList.add("visible");
      }, 300);

      return;
    }

    // Prevent re-click
    if (box.classList.contains("opened")) return;

    box.classList.add("opened");
    unlocked++;

    // If this is the LAST box → start moving
    if (unlocked === secretBoxes.length) {
      movingBox = box;
      box.innerHTML = "Catch me 😏";
      startMoving(box);
    } else {
      box.innerHTML = playfulTexts[index % playfulTexts.length];
    }

  });
});

const surpriseSection = document.getElementById("surprises");
const deepSecret = document.getElementById("deepSecret");

let pressTimer2 = null;
let isHolding = false;

// TOUCH START
surpriseSection.addEventListener("touchstart", (e) => {
  isHolding = true;

  pressTimer2 = setTimeout(() => {
    if (isHolding) {
      deepSecret.classList.add("visible");
    }
  }, 800);
});

// TOUCH MOVE (if user scrolls → cancel)
surpriseSection.addEventListener("touchmove", () => {
  isHolding = false;
  clearTimeout(pressTimer2);
});

// TOUCH END
surpriseSection.addEventListener("touchend", () => {
  isHolding = false;
  clearTimeout(pressTimer2);
});
