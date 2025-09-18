document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMobile = document.querySelector('.nav-mobile');
    const navItems = document.querySelectorAll('.nav-item');

    // Funzione per nascondere il menu e le sezioni
    const hideMenuAndSections = () => {
        navMobile.classList.add('hidden');
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('section-hidden');
        });
    };

    // Gestione del menu hamburger
    if (hamburgerMenu && navMobile) {
        hamburgerMenu.addEventListener('click', () => {
            navMobile.classList.toggle('hidden');
        });
    }

    // Gestione della navigazione (nasconde/mostra le sezioni)
    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                hideMenuAndSections();

                if (targetSection) {
                    targetSection.classList.remove('section-hidden');
                }
            });
        });
    }

    // Inizializza gli slider dei prodotti
    document.querySelectorAll('.product-card').forEach(card => {
        const slider = card.querySelector('.product-slider');
        const images = slider.querySelectorAll('img');
        const dotsContainer = card.querySelector('.slider-dots');
        
        if (images.length > 1) {
            images.forEach((img, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) {
                    dot.classList.add('active');
                }
                dotsContainer.appendChild(dot);
            });

            let currentIndex = 0;
            const dots = dotsContainer.querySelectorAll('.dot');

            function updateSlider() {
                slider.style.transform = `translateX(${-currentIndex * 100}%)`;
                dots.forEach(dot => dot.classList.remove('active'));
                dots[currentIndex].classList.add('active');
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSlider();
                });
            });

            let touchstartX = 0;
            let touchendX = 0;

            function checkDirection() {
                if (touchendX < touchstartX && currentIndex < images.length - 1) {
                    currentIndex++;
                }
                if (touchendX > touchstartX && currentIndex > 0) {
                    currentIndex--;
                }
                updateSlider();
            }

            slider.addEventListener('touchstart', e => {
                touchstartX = e.changedTouches[0].screenX;
            });

            slider.addEventListener('touchend', e => {
                touchendX = e.changedTouches[0].screenX;
                checkDirection();
            });
        } else {
            dotsContainer.style.display = 'none';
        }
    });
});
