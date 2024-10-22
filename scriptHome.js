fetch('projet.json')
  .then(response => response.json())
  .then(data => {
    document.querySelectorAll('.project-card').forEach(card => {
      console.log(card);
      const index = card.dataset.index;
      console.log(index);
      const project = data.projet[index];
      console.log();

      // Ajouter un événement de clic sur la carte
      card.addEventListener('click', () => {
        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');

        // Remplir la modal avec les données du JSON
        modalBody.innerHTML = `
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <p>${project.details}</p>
        `;

        // Afficher la modal
        modal.style.display = 'flex';
      });
    });

    // Bouton de fermeture
    document.querySelector('.close').addEventListener('click', () => {
      const modal = document.getElementById('project-modal');
      modal.style.display = 'none';
    });

    // Fermer la modal en cliquant en dehors du contenu
    window.addEventListener('click', (event) => {
      const modal = document.getElementById('project-modal');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  })
  .catch(error => console.error('Erreur lors du chargement des données JSON:', error));
