// Vérifiez la largeur de l'écran avant d'appliquer le script
if (window.innerWidth > 768) { // Remplacez 768 par la largeur que vous souhaitez vérifier
    // Sélectionner toutes les sections
    const sections = document.querySelectorAll("section");
    let currentSectionIndex = 0; // Index de la section active
    const totalSections = sections.length;

    // Fonction pour aller à une section spécifique
    function scrollToSection(index) {
        if (index >= 0 && index < totalSections) {
            sections[index].scrollIntoView({ behavior: "smooth" });
            currentSectionIndex = index;
        }
    }

    // Gestion du scroll de la molette
    window.addEventListener("wheel", (event) => {
        event.preventDefault(); // Désactive le comportement par défaut
        const delta = event.deltaY;
        if (delta > 0) {
            // Scroll vers le bas
            scrollToSection(currentSectionIndex + 1);
        } else if (delta < 0) {
            // Scroll vers le haut
            scrollToSection(currentSectionIndex - 1);
        }
    });

    // Gestion du scroll tactile pour mobile
    let startY = 0;
    window.addEventListener("touchstart", (event) => {
        startY = event.touches[0].clientY;
    });

    window.addEventListener("touchmove", (event) => {
        event.preventDefault(); // Empêche le scroll natif
        const endY = event.touches[0].clientY;
        const delta = startY - endY;
        if (delta > 50) {
            // Scroll vers le bas
            scrollToSection(currentSectionIndex + 1);
        } else if (delta < -50) {
            // Scroll vers le haut
            scrollToSection(currentSectionIndex - 1);
        }
    });
}
