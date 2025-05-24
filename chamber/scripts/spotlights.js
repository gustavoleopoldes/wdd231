
async function loadSpotlights() {
  try {
    const response = await fetch('scripts/members.json');
    const members = await response.json();

    const eligibleMembers = members.filter(member => 
      member.membership === 1 || member.membership === 2
    );
 
    const shuffledMembers = [...eligibleMembers].sort(() => 0.5 - Math.random());

    const spotlightMembers = shuffledMembers.slice(0, 3);
   
    const spotlightsContainer = document.getElementById('spotlights-container');
    
    spotlightsContainer.innerHTML = spotlightMembers.map(member => `
      <div class="spotlight-card level-${member.membership}">
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      </div>
    `).join('');
    
  } catch (error) {
    console.error('Error loading spotlight members:', error);
    document.getElementById('spotlights-container').innerHTML = '<p>Failed to load business spotlights.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadSpotlights);
