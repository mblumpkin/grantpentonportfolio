const panels = document.querySelectorAll(".panel");

// Intersection Observer to track active panel
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            panels.forEach(p => p.classList.remove("active"));
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.5 });

panels.forEach(panel => observer.observe(panel));

// Smooth horizontal scroll with mouse wheel
window.addEventListener("wheel", e => {
    e.preventDefault(); // prevent vertical scroll
    window.scrollBy({
        left: e.deltaY * 1.6,
        behavior: "smooth"
    });
}, { passive: false });

// Helper function: find the next/previous panel relative to current scroll
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
}

// Arrow button navigation
document.querySelector(".right").onclick = () => scrollToNextPanel("right");
document.querySelector(".left").onclick = () => scrollToNextPanel("left");