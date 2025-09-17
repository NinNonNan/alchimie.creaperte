document.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav a');
    let activeSection = null;

    // Funzione per mostrare una sezione
    const showSection = (sectionId) => {
        sections.forEach(sec => {
            sec.classList.add('section-hidden');
        });
        const sectionToShow = document.querySelector(sectionId);
        if (sectionToShow) {
            sectionToShow.classList.remove('section-hidden');
            activeSection = sectionId;
        }
    };

    // Gestione dei click sui link di navigazione
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            showSection(targetId);
        });
    });

    // Mostra la prima sezione all'avvio
    showSection('#intro');

    // Funzionalità per lo slide delle immagini
    const productSliders = document.querySelectorAll('.product-slider');
    productSliders.forEach(slider => {
        slider.addEventListener('scroll', () => {
            // Qui puoi aggiungere un indicatore di slide se lo desideri
        });
    });

    // Funzionalità per lo scorrimento delle sezioni (opzionale)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Attiva quando il 50% della sezione è visibile
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = `#${entry.target.id}`;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});
