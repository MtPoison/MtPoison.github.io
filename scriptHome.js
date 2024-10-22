document.addEventListener('DOMContentLoaded', function() {
  const categoryFilter = document.getElementById('category-filter');
  const categories = document.querySelectorAll('.category');

  categoryFilter.addEventListener('change', function() {
    const selectedCategory = categoryFilter.value;

    categories.forEach(category => {
      if (selectedCategory === 'all') {
        category.style.display = 'block';
      } else {
        if (category.getAttribute('data-category') === selectedCategory) {
          category.style.display = 'block';
        } else {
          category.style.display = 'none';
        }
      }
    });
  });

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const url = card.getAttribute('data-url');
      window.open(url, '_blank');
    });
  });
});
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('click', () => {
      const projectIndex = card.getAttribute('data-index');
      
      localStorage.setItem('selectedProjectIndex', projectIndex);
      
      window.location.href = 'projet.html';
  });
});

function displayProjectDetails(project) {
    const projectDetails = document.getElementById('project-details');
    projectDetails.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">Voir le projet</a>
    `;
}

 fetch('./projet.json')
 .then(response => {
     console.log('Statut de la réponse :', response.status);
     if (!response.ok) {
         throw new Error('Erreur de chargement : ' + response.statusText);
     }
     return response.json();
 })
 .then(data => {
     const projectIndex = localStorage.getItem('selectedProjectIndex');

     console.log('Index récupéré depuis localStorage :', projectIndex);

     if (projectIndex !== null) {
         const projectData = data.cpp[projectIndex];

         console.log('Données du projet récupérées :', projectData);

         if (projectData) {
             displayProjectDetails(projectData);
         } else {
             console.error('Projet non trouvé à l\'index:', projectIndex);
         }
     } else {
         console.error('Aucun index de projet sélectionné.');
     }
 })
 .catch(error => {
     console.error('Erreur lors du chargement du JSON :', error);
     const projectDetails = document.getElementById('project-details');
     projectDetails.innerHTML = `<p>Erreur lors du chargement des détails du projet.</p>`;
 });

function displayProjectDetails(project) {
 const projectDetails = document.getElementById('project-details');
 projectDetails.innerHTML = `
     <h3>${project.title}</h3>
     <p>${project.description}</p>
     <a href="${project.link}" target="_blank">Voir le projet</a>
 `;
}

