const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalCategory = document.getElementById('modal-category');
const modalPlatform = document.getElementById('modal-platform');
const modalCloseBtn = document.getElementById('modal-close');

export function openModal(game) {
  modalTitle.textContent = game.title;
  modalDescription.textContent = game.description;
  modalCategory.textContent = game.category;
  modalPlatform.textContent = game.platform;
  modal.classList.add('show');
  modal.hidden = false;
  modalCloseBtn.focus();
}

export function closeModal() {
  modal.classList.remove('show');
  modal.hidden = true;
}

modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});