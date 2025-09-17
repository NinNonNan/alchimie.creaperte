document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav a');
    const introCardLinks = document.querySelectorAll('.intro-card-link');
    
    // Funzione per mostrare una sezione con effetto di dissolvenza
    const showSection = (sectionId) => {
        sections.forEach(sec => {
            sec.classList.add('section-hidden');
        });
        const sectionToShow = document.querySelector(sectionId);
        if (sectionToShow) {
            // Un breve ritardo per assicurare che la transizione funzioni correttamente
            setTimeout(() => {
                sectionToShow.classList.remove('section-hidden');
            }, 50);
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

    // Gestione dei click sulle schede della sezione introduttiva
    introCardLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.closest('a').getAttribute('href');
            showSection(targetId);
        });
    });

    // Mostra la prima sezione all'avvio
    showSection('#intro');
});
