/* =========================================================
   PROJECT: CINEMATIC LOVE WEBSITE
   FILE: script.js
   ========================================================= */


/* =========================================================
   GLOBAL SELECTORS
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");
const finalButton = document.getElementById("btn");
const finalText = document.getElementById("finalText");
const bgm = document.getElementById("bgm");

let windowHeight = window.innerHeight;


/* =========================================================
   HELPER
   ========================================================= */

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


/* =========================================================
   SMOOTH SCROLL REVEAL (FINAL VERSION)
   ========================================================= */

function handleScrollReveal() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();

    // Start reveal early for smooth entry
    if (rect.top < windowHeight * 0.92) {

      // IMAGE reveals first
      if (el.tagName === "IMG") {
        el.classList.add("show");
      }

      // TEXT reveals slightly later
      else {
        if (!el.classList.contains("show")) {
          setTimeout(() => {
            el.classList.add("show");
          }, 180);
        }
      }
    }
  });
}

window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);


/* =========================================================
   FINAL MESSAGE BUTTON
   ========================================================= */

const finalMessages = [
  "No matter where life goes, I choose you.",
  "You are my calm in every storm.",
  "Even my worst days feel lighter with you.",
  "This page ends… but I don’t."
];

let finalIndex = 0;

finalButton.addEventListener("click", () => {
  finalText.innerText = finalMessages[finalIndex];
  finalText.classList.add("show");

  finalIndex++;
  if (finalIndex >= finalMessages.length) {
    finalIndex = 0;
  }
});


/* =========================================================
   BACKGROUND MUSIC (MOBILE SAFE + FADE IN)
   ========================================================= */

let musicStarted = false;

function startBackgroundMusic() {
  if (musicStarted) return;

  musicStarted = true;

  bgm.volume = 0;
  bgm.play().catch(() => {});

  let volume = 0;
  const fadeIn = setInterval(() => {
    volume += 0.015;
    bgm.volume = clamp(volume, 0, 0.45);

    if (volume >= 0.45) {
      clearInterval(fadeIn);
    }
  }, 120);
}

window.addEventListener("click", startBackgroundMusic, { once: true });
window.addEventListener("scroll", startBackgroundMusic, { once: true });


/* =========================================================
   ENDING CALM (MUSIC SOFTENS)
   ========================================================= */

const finalSection = document.querySelector(".final");

if (finalSection) {
  const endObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && musicStarted) {

          let volume = bgm.volume;

          const fadeDown = setInterval(() => {
            volume -= 0.01;
            bgm.volume = clamp(volume, 0.25, 0.45);

            if (volume <= 0.25) {
              clearInterval(fadeDown);
            }
          }, 120);

        }
      });
    },
    { threshold: 0.6 }
  );

  endObserver.observe(finalSection);
}


/* =========================================================
   RESIZE HANDLING
   ========================================================= */

window.addEventListener("resize", () => {
  windowHeight = window.innerHeight;
});
