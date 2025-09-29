document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item, .scroll-link');
    const exploreLinks = document.querySelectorAll('.explore-link'); // Link "Esplora la collezione"

    // Funzione per mostrare la sezione
    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('section-hidden');
            } else {
                section.classList.add('section-hidden');
            }
        });
    }

    // Gestione click menu principale
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Chiudi menu mobile se aperto
            const mobileNav = document.querySelector('.nav-mobile');
            if (mobileNav.classList.contains('visible')) {
                mobileNav.classList.remove('visible');
            }
        });
    });

    // Gestione click "Esplora la collezione"
    exploreLinks.forEach(link => {
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

    hamburger.addEventListener('click', (e) => {
        mobileNav.classList.toggle('visible');
        e.stopPropagation();
    });

    // Chiudi il menu se clicchi fuori
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('visible') && !mobileNav.contains(e.target) && e.target !== hamburger) {
            mobileNav.classList.remove('visible');
        }
    });

    // Carousel dei prodotti con swipe
    const sliders = document.querySelectorAll('.product-slider');

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('img');
        const dotsContainer = slider.nextElementSibling; // deve essere <div class="slider-dots"></div>
        let currentIndex = 0;

        // inizializza immagini
        slides.forEach((slide, idx) => {
            slide.style.display = idx === 0 ? 'block' : 'none';
        });

        // inizializza i dot
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');

                dot.addEventListener('click', () => {
                    showSlide(index);
                });

                dotsContainer.appendChild(dot);
            });
        }

        // funzione per mostrare una slide
        function showSlide(index) {
            slides.forEach(slide => slide.style.display = 'none');
            slides[index].style.display = 'block';

            if (dotsContainer) {
                dotsContainer.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
                dotsContainer.children[index].classList.add('active');
            }

            currentIndex = index;
        }

        // swipe con touch
        let startX = 0;
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) { // soglia swipe
                if (diffX > 0) {
                    // swipe sinistra → slide successiva
                    const nextIndex = (currentIndex + 1) % slides.length;
                    showSlide(nextIndex);
                } else {
                    // swipe destra → slide precedente
                    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                    showSlide(prevIndex);
                }
            }
        });
    });

    // --- FORM CONTATTI ---
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            try {
                await fetch(
                    'https://script.google.com/macros/s/AKfycby5yw9kyHMxKs3YAYKcGMuhBRQDQbnSa2BVY1e1NdnFsBswtC70QLuXxSGR5G43jpef/exec',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                        mode: 'no-cors'
                    }
                );

                form.style.display = 'none';

                const thankYouMessage = document.createElement('p');
                thankYouMessage.textContent = 'Grazie! Ti contatteremo al più presto.';
                thankYouMessage.classList.add('contact-thankyou');
                form.parentNode.appendChild(thankYouMessage);

            } catch (err) {
                console.error("Errore durante l'invio:", err);
                alert('Errore di connessione. Riprova più tardi.');
            }
        });
    }
});
