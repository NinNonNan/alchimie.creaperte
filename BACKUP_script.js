document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');
    const exploreLinks = document.querySelectorAll('.explore-link'); // Link "Esplora la collezione"

    // Funzione per mostrare la sezione
    function showSection(sectionId) {
        sections.forEach(section => {
            if(section.id === sectionId) {
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
            if(mobileNav.classList.contains('visible')) {
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
        e.stopPropagation(); // impedisce che il click sull'hamburger chiuda subito il menu
    });

    // Chiudi il menu se clicchi fuori
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('visible') && !mobileNav.contains(e.target) && e.target !== hamburger) {
            mobileNav.classList.remove('visible');
        }
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

