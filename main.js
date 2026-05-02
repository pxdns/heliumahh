const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');

// Map URL paths to local HTML files
const ROUTES = {
    '/':          'index.html',
    '/packs':     'packs.html',
    '/mcleaner':  'mcleaner.html',
    '/converter': 'converter.html'
};

function resolveRoute(urlString) {
    try {
        const u = new URL(urlString);
        // Strip trailing slash for matching (except root)
        const pathname = u.pathname.replace(/\/$/, '') || '/';
        return ROUTES[pathname] || null;
    } catch {
        return null;
    }
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false,  // allow loading local vendor/ files
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'favicon.ico'),
        titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
        backgroundColor: '#ffffff'
    });

    win.loadFile('index.html');

    // Intercept navigation to map /route → local .html file
    win.webContents.on('will-navigate', (event, url) => {
        // Let file:// navigations through (already resolved)
        if (url.startsWith('file://')) return;

        // Open external http(s) links in system browser
        if (url.startsWith('http://') || url.startsWith('https://')) {
            event.preventDefault();
            shell.openExternal(url);
            return;
        }

        const file = resolveRoute(url);
        if (file) {
            event.preventDefault();
            win.loadFile(file);
        }
    });

    // Handle window.open / target="_blank"
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
