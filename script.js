document.addEventListener('DOMContentLoaded', () => {

    // Funzione per l'effetto di dissolvenza (fade-in)
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('section-hidden');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Funzione per gestire gli slider e i pallini
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const slider = card.querySelector('.product-slider');
        const dotsContainer = card.querySelector('.slider-dots');
        const images = slider.querySelectorAll('img');

        // Crea i pallini dinamicamente
        if (images.length > 1) {
            for (let i = 0; i < images.length; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dotsContainer.appendChild(dot);

                // Aggiunge un click listener per la navigazione
                dot.addEventListener('click', () => {
                    const scrollPosition = i * slider.offsetWidth;
                    slider.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    });
                });
            }

            const dots = dotsContainer.querySelectorAll('.dot');
            dots[0].classList.add('active'); // Imposta il primo pallino come attivo

            // Gestisce lo scorrimento per aggiornare il pallino attivo
            slider.addEventListener('scroll', () => {
                const scrollLeft = slider.scrollLeft;
                const cardWidth = slider.offsetWidth;
                const activeIndex = Math.round(scrollLeft / cardWidth);

                dots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            });
        } else {
            // Nasconde il contenitore dei pallini se c'è solo un'immagine
            dotsContainer.style.display = 'none';
        }
    });

});
