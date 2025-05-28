document.getElementById('timestamp').value = new Date().toISOString();
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

document.querySelectorAll('.card a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const modalId = link.getAttribute('href').replace('#', '');
    document.getElementById(modalId).style.display = 'flex';
  });
});

document.querySelectorAll('.modal .close').forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-close');
    document.getElementById(modalId).style.display = 'none';
  });
});

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});
