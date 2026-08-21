/**
 * 20-carousel component.js
 * RTL Interactive Carousel Slider Engine
 */

let currentCarouselIndex = 0;
const totalCarouselSlides = 4;

function updateCarouselView() {
    const track = document.getElementById('carouselTrack');
    const badge = document.getElementById('carouselCounterBadge') || document.getElementById('carouselSlideBadge');
    const dots = document.querySelectorAll('#carouselDotsGroup .carousel-dot');

    if (track) {
        track.style.transform = 'translateX(' + (currentCarouselIndex * 100) + '%)';
    }

    if (badge) {
        badge.textContent = 'الشريحة ' + (currentCarouselIndex + 1) + ' من ' + totalCarouselSlides;
    }

    dots.forEach((dot, idx) => {
        if (idx === currentCarouselIndex) {
            dot.className = 'carousel-dot h-2.5 w-7 rounded-full bg-bx-primary transition-all';
        } else {
            dot.className = 'carousel-dot h-2.5 w-2.5 rounded-full bg-bx-border hover:bg-bx-primary transition-all';
        }
    });

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

function carouselNextSlide() {
    currentCarouselIndex = (currentCarouselIndex + 1) % totalCarouselSlides;
    updateCarouselView();
}

function carouselPrevSlide() {
    currentCarouselIndex = (currentCarouselIndex - 1 + totalCarouselSlides) % totalCarouselSlides;
    updateCarouselView();
}

function goToCarouselSlide(index) {
    currentCarouselIndex = Math.max(0, Math.min(index, totalCarouselSlides - 1));
    updateCarouselView();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCarouselView();
});
