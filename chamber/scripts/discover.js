
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('discover-container');
  const lastVisitBox = document.getElementById('last-visit');
  const DATA_URL = 'scripts/discover.json';

  async function loadItems() {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) throw new Error('Failed to load data');
      const data = await response.json();

      container.innerHTML = data.items.map((item, index) => `
        <article class="card">
          <h2>${item.name}</h2>
          <figure>
            <img src="images/${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button class="learn-more-btn" data-index="${index}" aria-label="Learn more about ${item.name}">Learn More</button>
        </article>
      `).join('');

      setupModal(data);
    } catch (error) {
      container.innerHTML = '<p>Sorry, failed to load items.</p>';
      console.error(error);
    }
  }

  function showLastVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    let message = '';

    if (!lastVisit) {
      message = 'Welcome! Let us know if you have any questions.';
    } else {
      const diffMs = now - parseInt(lastVisit, 10);
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 1) {
        message = 'Back so soon! Awesome!';
      } else {
        message = `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
      }
    }

    lastVisitBox.textContent = message;
    localStorage.setItem('lastVisit', now.toString());
  }

  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'item-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" role="button" aria-label="Close modal">&times;</span>
        <h2 id="modal-title"></h2>
        <figure>
          <img id="modal-image" src="" alt="" width="300" height="200">
        </figure>
        <address id="modal-address"></address>
        <p id="modal-description"></p>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    return modal;
  }

  let modal = null;

  function setupModal(data) {
    modal = createModal();

    document.querySelectorAll('.learn-more-btn').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        const item = data.items[index];

        modal.querySelector('#modal-title').textContent = item.name;
        modal.querySelector('#modal-image').src = `images/${item.image}`;
        modal.querySelector('#modal-image').alt = item.name;
        modal.querySelector('#modal-address').textContent = item.address;
        modal.querySelector('#modal-description').textContent = item.description;

        modal.style.display = 'flex';
      });
    });
  }

  loadItems();
  showLastVisitMessage();
});