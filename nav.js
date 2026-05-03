// Navigation handler for back button and keyboard shortcut
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('backBtn');
    
    // Show back button on all pages except index
    if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
        if (backBtn) {
            backBtn.style.display = 'flex';
        }
    }
    
    // Back button click handler
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '/';
        });
    }
    
    // Keyboard shortcut: Option+B (Alt+B on Windows)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 'b') {
            e.preventDefault();
            window.location.href = '/';
        }
    });
});
