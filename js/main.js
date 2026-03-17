const panels = document.querySelectorAll(".panel");
const container = document.querySelector(".container");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

// --- Intersection Observer for active panel ---
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            panels.forEach(p => p.classList.remove("active"));
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.5 });

panels.forEach(panel => observer.observe(panel));

// --- Smooth horizontal scroll with mouse wheel ---
window.addEventListener("wheel", e => {
    e.preventDefault(); // prevent vertical scroll
    window.scrollBy({
        left: e.deltaY * 1.6,
        behavior: "smooth"
    });
    setTimeout(updateArrows, 50); // update arrows after scroll
}, { passive: false });

// --- Scroll to next/previous panel ---
function scrollToNextPanel(direction = "right") {
    const scrollLeft = window.scrollX;
    if (direction === "right") {
        for (let i = 0; i < panels.length; i++) {
            if (panels[i].offsetLeft > scrollLeft + 10) {
                window.scrollTo({ left: panels[i].offsetLeft, behavior: "smooth" });
                break;
            }
        }
    } else if (direction === "left") {
        for (let i = panels.length - 1; i >= 0; i--) {
            if (panels[i].offsetLeft < scrollLeft - 10) {
                window.scrollTo({ left: panels[i].offsetLeft, behavior: "smooth" });
                break;
            }
        }
    }
    setTimeout(updateArrows, 350); // update arrows after smooth scroll
}

// --- Arrow click events ---
leftArrow.onclick = () => scrollToNextPanel("left");
rightArrow.onclick = () => scrollToNextPanel("right");

// --- Show/hide arrows based on scroll position ---
function updateArrows() {
    const scrollLeft = window.scrollX;
    const maxScroll = container.scrollWidth - window.innerWidth;

    // Hide left arrow if at start
    if (scrollLeft <= 0) {
        leftArrow.style.display = "none";
    } else {
        leftArrow.style.display = "block";
    }

    // Hide right arrow if at end
    if (scrollLeft >= maxScroll - 1) {
        rightArrow.style.display = "none";
    } else {
        rightArrow.style.display = "block";
    }
}

// --- Initialize arrows on load ---
updateArrows();

// --- Optional: update arrows on manual scroll ---
window.addEventListener("scroll", updateArrows);