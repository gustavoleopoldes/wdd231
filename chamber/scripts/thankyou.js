const params = new URLSearchParams(window.location.search);
const fields = ['firstname', 'lastname', 'email', 'phone', 'organization', 'timestamp'];
const box = document.getElementById('confirmation-details');

fields.forEach(field => {
  const value = params.get(field);
  if (value) {
    const p = document.createElement('p');
    if (field === 'timestamp') {
      const date = new Date(value);
      p.innerHTML = `<strong>${field}:</strong> ${date.toLocaleString('en-US')}`;
    } else {
      p.innerHTML = `<strong>${field}:</strong> ${value}`;
    }
    box.appendChild(p);
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;
