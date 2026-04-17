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

const birthdayPara = document.querySelector(".birthday-paragraph");

const showBirthday = () => {
  const rect = birthdayPara.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.8) {
    birthdayPara.style.opacity = "1";
  }
};

window.addEventListener("scroll", showBirthday);

/* Background Music on Birthday Section */
const music = document.getElementById("bgMusic");
const birthdaySection = document.getElementById("birthday");

let musicStarted = false;

const playMusicOnScroll = () => {
  if (musicStarted) return;

  const rect = birthdaySection.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.7) {
    musicStarted = true;

    music.volume = 0.1; // start low
    music.play().catch(() => {});

    // smooth fade in
    let vol = 0.1;
    const fade = setInterval(() => {
      if (vol < 1) {
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 300);
  }
};

window.addEventListener("scroll", playMusicOnScroll);

/* Voice Note Playback */
document.addEventListener("DOMContentLoaded", () => {

  const voiceBtn = document.getElementById("voiceBtn");
  const voiceNote = document.getElementById("voiceNote");
  const music = document.getElementById("bgMusic");
  const birthdaySection = document.getElementById("birthday");

  let isPlaying = false;
  let musicStarted = false;

  // 🎵 Start music on scroll to birthday
  window.addEventListener("scroll", () => {
    if (musicStarted) return;

    const rect = birthdaySection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.7) {
      musicStarted = true;
      music.volume = 0.2;
      music.play().catch(() => {});
    }
  });

  // 🎙️ Voice button logic
  voiceBtn.addEventListener("click", () => {

    if (!isPlaying) {
      // Lower background music
      let vol = music.volume;

      const fadeDown = setInterval(() => {
        if (vol > 0.08) {
          vol -= 0.02;
          music.volume = vol;
        } else {
          clearInterval(fadeDown);
        }
      }, 100);

      voiceNote.play();
      voiceBtn.textContent = "⏸";
      isPlaying = true;

    } else {
      voiceNote.pause();

      if (musicStarted) music.volume = 0.5;

      voiceBtn.textContent = "▶";
      isPlaying = false;
    }
  });

  // 🔁 When voice ends
  voiceNote.addEventListener("ended", () => {
    isPlaying = false;
    voiceBtn.textContent = "▶";

    let vol = music.volume;

    const fadeUp = setInterval(() => {
      if (vol < 0.2) {
        vol += 0.02;
        music.volume = vol;
      } else {
        clearInterval(fadeUp);
      }
    }, 120);
  });

});

/* Album Video Hover Play  For mobile, it plays on tap */
const videos = document.querySelectorAll(".album-video");

videos.forEach(video => {
  video.addEventListener("mouseenter", () => video.play());
  video.addEventListener("mouseleave", () => video.pause());

  // Mobile support
  video.addEventListener("touchstart", () => video.play());
});

albumCards.forEach(card => {
  card.addEventListener("click", () => {

    const video = card.querySelector("video");

    if (video) {
      if (card.classList.contains("active")) {
        video.pause();
      } else {
        video.play();
      }
    }

  });
});


/* Particle Background */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const PARTICLE_COUNT = 100;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 2 + 0.5;

    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = (Math.random() - 0.5) * 0.2;

    this.opacity = Math.random() * 0.5 + 0.2;
    this.fade = Math.random() * 0.01;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;

    // twinkle effect
    this.opacity += this.fade;

    if (this.opacity > 0.8 || this.opacity < 0.2) {
      this.fade *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(212,175,55,${this.opacity})`;
    ctx.fill();
  }
}

// create particles
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// resize fix
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});