# Google Docs - Minecraft Pack Tools Launcher

A native macOS app for cleaning Minecraft texture packs, converting between versions, and accessing pack resources.

## Download

Download the latest DMG from the [Actions](../../actions) tab (look for the latest successful build and download the `macos-dmg` artifact).

## Features

✅ **Pack Cleaner** - Remove junk files (.DS_Store, Thumbs.db, IDE configs, etc.)  
✅ **Version Converter** - Convert packs between Minecraft versions 1.8.9 to 1.21.4  
✅ **Pack.mcmeta Updater** - Update pack format for any Minecraft version  
✅ **Pack Collection** - Browse and download curated texture packs  
✅ **External Resources** - Quick access to Texture Packs and Shadownnet  
✅ **Native macOS App** - Built with Electron, works offline  

## Keyboard Shortcuts

- **⌥B** (Option+B) - Return to home page from anywhere

## Installation

1. Download the DMG file from Actions
2. Open the DMG
3. Drag "Google Docs" to Applications
4. Launch from Applications folder

## Building from Source

The app is automatically built via GitHub Actions on every push to main. The workflow:

1. Creates an Electron app wrapper
2. Bundles all HTML/CSS/JS files
3. Builds DMG for both Intel (x64) and Apple Silicon (arm64)
4. Uploads artifacts (available for 30 days)

## License

MIT
