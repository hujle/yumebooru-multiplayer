const search = document.getElementById('search');
const cards  = document.querySelectorAll('.game-card');
search.addEventListener('input', () => {
    const q = search.value.toLowerCase();
    cards.forEach(c => {
        c.style.display = c.textContent.toLowerCase().includes(q) ? 'flex' : 'none';
    });
});