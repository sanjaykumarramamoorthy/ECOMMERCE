const slider = document.querySelector('.slider');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 33}%)`;

    // Add the "active" class with a slight delay to allow animation
    dots.forEach(dot => dot.classList.remove('active'));
    setTimeout(() => {
        dots[index].classList.add('active');
    }, 50); // Delay ensures smooth elongation during sliding
}

function autoSlide() {
    currentIndex = (currentIndex + 1) % dots.length;
    showSlide(currentIndex);
}

// Add click event to dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index);
        showSlide(currentIndex);
    });
});

// Start the slider
showSlide(currentIndex);
setInterval(autoSlide, 3000);