// Preload: intercept internal route links so they work in Electron
// (file:// protocol doesn't understand /packs style paths)
window.addEventListener('DOMContentLoaded', () => {
    const ROUTES = {
        '/':          'index.html',
        '/packs':     'packs.html',
        '/mcleaner':  'mcleaner.html',
        '/converter': 'converter.html'
    };

    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href) return;

        // Only intercept root-relative paths like /packs, /mcleaner, /converter, /
        if (href.startsWith('/') && !href.startsWith('//')) {
            const pathname = href.replace(/\/$/, '') || '/';
            const file = ROUTES[pathname];
            if (file) {
                e.preventDefault();
                window.location.href = file;
            }
        }
    });
});
