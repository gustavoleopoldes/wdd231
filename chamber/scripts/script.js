
const menuItem = document.querySelector("#menu");
const navElement = document.querySelector("#animated-menu");

menuItem.addEventListener("click", () => {
    navElement.classList.toggle("open");
    menuItem.classList.toggle("open");

});

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");
  const membersContainer = document.getElementById("members-container");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  yearSpan.textContent = new Date().getFullYear();
  lastModifiedSpan.textContent = document.lastModified;

  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
  });

  async function loadMembers() {
    try {
      const response = await fetch("scripts/members.json");
      const members = await response.json();

      membersContainer.innerHTML = members.map(member => `
        <div class="member-card level-${member.membership}">
          <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="34" height="40" />
          <h3>${member.name}</h3>
          <p>${member.description}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
      `).join("");
    } catch (error) {
      membersContainer.innerHTML = "<p>Failed to load members.</p>";
      console.error("Error loading members:", error);
    }
  }

  loadMembers();
});
