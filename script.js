document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // Funzione per mostrare/nascondere il menu
    function toggleMenu() {
        menuOverlay.classList.toggle('active');
    }

    // Funzione per mostrare la sezione corretta
    function showSection(targetSectionId) {
        // Nascondi tutte le sezioni
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Mostra la sezione desiderata
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    // Event listener per aprire il menu
    menuToggle.addEventListener('click', toggleMenu);

    // Event listener per chiudere il menu
    menuClose.addEventListener('click', toggleMenu);

    // Event listener per la navigazione
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            const targetSectionId = link.getAttribute('data-section');
            
            toggleMenu(); // Chiudi il menu dopo aver cliccato
            showSection(targetSectionId);
        });
    });

    // --- CODICE PER LO SLIDER DI IMMAGINI ---
    const sliderContainer = document.querySelector('.image-slider-container');
    if (sliderContainer) {
        const slider = sliderContainer.querySelector('.image-slider');
        const prevBtn = sliderContainer.querySelector('.prev-btn');
        const nextBtn = sliderContainer.querySelector('.next-btn');
        const images = sliderContainer.querySelectorAll('.slider-image');
        let currentIndex = 0;

        function updateSlider() {
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        });
    }
    // --- FINE CODICE SLIDER ---
});
