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

fetch('projet.json')
    .then(response => response.json())
    .then(data => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectKey = card.getAttribute('data-url');
                const projectData = data.cpp.find(project => project.title.toLowerCase().includes(projectKey));

                if (projectData) {
                    displayProjectDetails(projectData);
                }
            });
        });
    })
    .catch(error => console.error('Erreur lors du chargement du JSON:', error));

// Fonction pour afficher les détails du projet
function displayProjectDetails(project) {
    const projectDetails = document.getElementById('project-details');
    projectDetails.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">Voir le projet</a>
    `;
}

