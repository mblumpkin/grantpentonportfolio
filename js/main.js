const panels = document.querySelectorAll(".panel");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            panels.forEach(p => p.classList.remove("active"));
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.5 });

panels.forEach(panel => observer.observe(panel));

window.addEventListener("wheel", e => {
    window.scrollBy({
        left: e.deltaY * 1.6,
        behavior: "smooth"
    });
});

document.querySelector(".right").onclick = () => {
    window.scrollBy({ left: window.innerWidth, behavior: "smooth" });
};

document.querySelector(".left").onclick = () => {
    window.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
};