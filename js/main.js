const panels = document.querySelectorAll(".panel");
const container = document.querySelector(".container");
const reel = document.querySelector(".reel");

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");


// ===== ACTIVE PANEL OBSERVER =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            panels.forEach(p => p.classList.remove("active"));
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.5 });

panels.forEach(panel => observer.observe(panel));


// ===== WHEEL SCROLL =====
window.addEventListener("wheel", e => {
    e.preventDefault();
    window.scrollBy({
        left: e.deltaY * 1.4,
        behavior: "smooth"
    });
}, { passive: false });


// ===== SMART PANEL SCROLL =====
function scrollRight() {
    const scrollX = window.scrollX;

    const reelStart = reel.offsetLeft;
    const reelEnd = reel.offsetLeft + reel.scrollWidth - window.innerWidth;

    // If inside reel → scroll within reel first
    if (scrollX >= reelStart && scrollX < reelEnd - 5) {
        window.scrollBy({
            left: window.innerWidth,
            behavior: "smooth"
        });
        return;
    }

    // otherwise go to next panel
    for (let i = 0; i < panels.length; i++) {
        if (panels[i].offsetLeft > scrollX + 10) {
            window.scrollTo({
                left: panels[i].offsetLeft,
                behavior: "smooth"
            });
            return;
        }
    }
}

function scrollLeft() {
    const scrollX = window.scrollX;

    const reelStart = reel.offsetLeft;

    // If inside reel → scroll within reel first
    if (scrollX > reelStart + 5 && scrollX <= reel.offsetLeft + reel.scrollWidth) {
        window.scrollBy({
            left: -window.innerWidth,
            behavior: "smooth"
        });
        return;
    }

    // otherwise go to previous panel
    for (let i = panels.length - 1; i >= 0; i--) {
        if (panels[i].offsetLeft < scrollX - 10) {
            window.scrollTo({
                left: panels[i].offsetLeft,
                behavior: "smooth"
            });
            return;
        }
    }
}


// ===== ARROWS =====
rightArrow.onclick = scrollRight;
leftArrow.onclick = scrollLeft;


// ===== ARROW VISIBILITY =====
function updateArrows() {
    const maxScroll = container.scrollWidth - window.innerWidth;
    const scrollX = window.scrollX;

    leftArrow.style.display = scrollX <= 0 ? "none" : "block";
    rightArrow.style.display = scrollX >= maxScroll - 2 ? "none" : "block";
}

window.addEventListener("scroll", updateArrows);
updateArrows();