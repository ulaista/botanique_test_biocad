loadComponent('#header', '/components/header.html').then(() => {
    document.querySelectorAll('.nav-item').forEach(item => {
        const page = item.getAttribute('data-page');
        if (window.location.pathname.includes(page)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
loadComponent('#container', '/components/analytics-container.html')