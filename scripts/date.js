document.addEventListener('DOMContentLoaded', () => {
    
    const currentYearSpan = document.getElementById('currentyear');
    currentYearSpan.textContent = new Date().getFullYear();

    const lastModifiedParagraph = document.getElementById('lastModified');
    lastModifiedParagraph.textContent = `Last Update: ${document.lastModified}`;
});