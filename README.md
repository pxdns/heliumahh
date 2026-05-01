# Pauth - Static Pack Cleaner & Downloads

A simple static site for cleaning Minecraft texture packs and downloading curated packs. No authentication, no database, no server required.

## Features

✅ **macOS Pack Cleaner** - Remove junk files from texture packs
✅ **Static Downloads** - Curated pack downloads (add your own URLs)
✅ **No Authentication** - No accounts or login required
✅ **Fully Static** - Works on GitHub Pages
✅ **Client-Side Only** - All processing in browser

## Setup

1. Add your pack URLs in `app.js` in the `STATIC_PACKS` array
2. Deploy to GitHub Pages
3. Done!

## Adding Packs

Edit `app.js` and add your packs to the `STATIC_PACKS` array:

```javascript
const STATIC_PACKS = [
    {
        name: 'Your Pack Name',
        description: 'Description of your pack',
        tags: ['16x', 'pvp', 'clean'],
        downloads: 0,
        url: 'https://your-url.com/pack.zip'
    }
];
```

## Cleaner Features

Removes common junk files:
- .DS_Store (macOS)
- Thumbs.db (Windows)
- .git, .svn, .hg folders
- __MACOSX folders
- IDE folders (.idea, .vscode)
- Source files (.java, .class)
- Design files (.psd, .ai, .blend)
- Build files and more

## Deployment

### GitHub Pages

1. Push this folder to a GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Your site is live!

### Other Static Hosting

Works on any static hosting:
- Netlify
- Vercel
- Cloudflare Pages
- Any web server

## File Structure

```
pauth-static/
├── index.html    # Main page
├── styles.css    # Styles
├── app.js        # JavaScript
└── README.md     # This file
```

## Usage

1. **Clean Pack**: Drop a zip file to remove junk files
2. **Download Packs**: Browse and download curated packs

## License

MIT
