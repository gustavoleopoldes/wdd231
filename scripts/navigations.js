document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const primaryNav = document.getElementById('primary-nav');
    
    menuBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            primaryNav.classList.remove('open');
        }
    });
});