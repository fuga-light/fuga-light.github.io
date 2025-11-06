function setTheme(isDark) {
    if (isDark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    localStorage.setItem('fuga_theme_dark', isDark ? '1' : '0');
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('fuga_theme_dark') === '1';
    setTheme(saved);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));
});