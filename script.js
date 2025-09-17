document.addEventListener('DOMContentLoaded', () => {

    // Funzione per la gestione della navigazione tra le sezioni
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    const hideAllSections = () => {
        sections.forEach(section => {
            section.style.display = 'none';
        });
    };

    const showSection = (id) => {
        hideAllSections();
        const targetSection = document.querySelector(id);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    };

    // Mostra la sezione corretta al caricamento della pagina
    const currentHash = window.location.hash || '#intro';
    showSection(currentHash);

    // Gestisce il click sui link di navigazione
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                showSection(targetId);
                history.pushState(null, '', targetId);
            }
        });
    });

    // Gestisce la navigazione con i pulsanti avanti/indietro del browser
    window.addEventListener('popstate', () => {
        const currentHash = window.location.hash || '#intro';
        showSection(currentHash);
    });

    // Funzione per gestire gli slider e i pallini
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const slider = card.querySelector('.product-slider');
        const dotsContainer = card.querySelector('.slider-dots');
        const images = slider.querySelectorAll('img');

        // Crea i pallini dinamicamente solo se ci sono più immagini
        if (images.length > 1) {
            dotsContainer.style.display = 'flex';
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

    // *** NUOVO CODICE PER GESTIRE L'ICONA DEL MENU ATTIVA ***
    const updateActiveNavIcon = () => {
        const currentHash = window.location.hash || '#intro';
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            }
        });
    };

    // Chiama la funzione all'avvio e ad ogni cambio di hash
    updateActiveNavIcon();
    window.addEventListener('popstate', updateActiveNavIcon);
    navLinks.forEach(link => link.addEventListener('click', updateActiveNavIcon));
});
