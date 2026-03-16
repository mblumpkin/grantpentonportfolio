const items = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

items.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = "translateY(40px)";
    item.style.transition = "all 1s ease";
    observer.observe(item);
});