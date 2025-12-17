/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* FINAL TEXT */
const messages = [
  "No matter where life goes, I choose you.",
  "You are my calm in every storm.",
  "Even my worst days feel lighter with you.",
  "This page ends… but I don’t."
];

let index = 0;
const btn = document.getElementById("btn");
const finalText = document.getElementById("finalText");

btn.addEventListener("click", () => {
  finalText.innerText = messages[index];
  index = (index + 1) % messages.length;
});


/* BGM – MOBILE SAFE FADE IN */
const music = document.getElementById("bgm");
let started = false;

function startMusic() {
  if (!started) {
    music.volume = 0;
    music.play();

    let v = 0;
    const fade = setInterval(() => {
      if (v < 0.5) {
        v += 0.02;
        music.volume = v;
      } else {
        clearInterval(fade);
      }
    }, 100);

    started = true;
  }
}

window.addEventListener("click", startMusic, { once: true });
window.addEventListener("scroll", startMusic, { once: true });
