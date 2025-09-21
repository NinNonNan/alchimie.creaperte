document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');

    function showSection(sectionId) {
        sections.forEach(section => {
            if(section.id === sectionId) {
                section.classList.remove('section-hidden');
            } else {
                section.classList.add('section-hidden');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Mostra la sezione intro all'avvio
    showSection('intro');

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.nav-mobile');

    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });

    // Carousel dei prodotti
    const sliders = document.querySelectorAll('.product-slider');

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('img');
        let currentIndex = 0;

        const dotsContainer = slider.nextElementSibling; // slider-dots
        if(dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if(index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    slides[currentIndex].style.display = 'none';
                    slides[index].style.display = 'block';
                    dotsContainer.children[currentIndex].classList.remove('active');
                    dot.classList.add('active');
                    currentIndex = index;
                });
                dotsContainer.appendChild(dot);
            });
        }

        slides.forEach((slide, idx) => {
            if(idx !== 0) slide.style.display = 'none';
        });

        // Auto slide (opzionale)
        setInterval(() => {
            slides[currentIndex].style.display = 'none';
            dotsContainer.children[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].style.display = 'block';
            dotsContainer.children[currentIndex].classList.add('active');
        }, 5000);
    });
});
