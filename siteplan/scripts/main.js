import { fetchGames } from './data.js';
import { openModal } from './modal.js';

const gamesList = document.getElementById('games-list');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const filterInput = document.getElementById('game-filter');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let allGames = [];

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleFavorite(id, button) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
    button.classList.remove('favorited');
    button.textContent = 'Add to Favorites';
  } else {
    favorites.push(id);
    button.classList.add('favorited');
    button.textContent = 'Favorited';
  }
  saveFavorites();
}

function createGameCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-pressed', 'false');

  card.innerHTML = `
    <img src="${game.image}" alt="${game.title}" class="game-image" loading="lazy" />
    <h3>${game.title}</h3>
    <p><strong>Category:</strong> ${game.category}</p>
    <p><strong>Platform:</strong> ${game.platform}</p>
  `;

  card.addEventListener('click', () => openModal(game));
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openModal(game);
    }
  });

  const favBtn = document.createElement('button');
  favBtn.className = 'favorite-btn';
  if (favorites.includes(game.id)) {
    favBtn.classList.add('favorited');
    favBtn.textContent = 'Favorited';
  } else {
    favBtn.textContent = 'Add to Favorites';
  }

  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(game.id, favBtn);
  });

  card.appendChild(favBtn);

  return card;
}

function displayGames(games) {
  gamesList.innerHTML = '';
  games.forEach(game => {
    const card = createGameCard(game);
    gamesList.appendChild(card);
  });
}

function filterGames() {
  const query = filterInput.value.toLowerCase();
  const filtered = allGames.filter(game =>
    game.title.toLowerCase().includes(query) ||
    game.category.toLowerCase().includes(query)
  );
  displayGames(filtered);
}

async function init() {
  allGames = await fetchGames();
  allGames = allGames.slice(0, 15);
  displayGames(allGames);
}

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  navLinks.classList.toggle('show');
});

filterInput.addEventListener('input', filterGames);

init();

window.addEventListener('resize', () => {
  if (window.innerWidth > 700) {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});