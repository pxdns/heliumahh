// Static pack downloads - Add your packs here
const STATIC_PACKS = [
    {
        name: 'Example Pack 1',
        description: 'A clean, optimized texture pack for PvP',
        tags: ['16x', 'pvp', 'clean'],
        downloads: 1234,
        url: 'https://example.com/pack1.zip'
    },
    {
        name: 'Example Pack 2',
        description: 'Detailed 32x textures for survival',
        tags: ['32x', 'survival', 'detailed'],
        downloads: 5678,
        url: 'https://example.com/pack2.zip'
    },
    {
        name: 'Example Pack 3',
        description: 'Medieval themed pack for builders',
        tags: ['medieval', '32x', 'rpg'],
        downloads: 9012,
        url: 'https://example.com/pack3.zip'
    }
];

// Cleaner Tool
const JUNK_PATTERNS = [
    '.ds_store', 'thumbs.db', '.git/', '__macosx/', '.svn/', '.hg/',
    '.idea/', '.vscode/', 'node_modules/', '.java', '.class', '.psd',
    '.ai', '.blend', '.max', '.ma', '.mb', '.sh', '.bat', '.cmd',
    '.js.map', '.ts.map', '.css.map', '.min.js', '.min.css',
    '.dockerfile', 'docker-compose.yml', 'makefile', '.gitignore',
    '.eslintrc', '.prettierrc', '.babelrc', '.flowconfig'
];

let currentFile = null;
let cleanedPackBlob = null;

async function cleanPack(file) {
    const zip = await JSZip.loadAsync(file);
    
    const filesToRemove = [];
    const filesToKeep = [];
    
    Object.keys(zip.files).forEach(filename => {
        const lower = filename.toLowerCase();
        const isJunk = JUNK_PATTERNS.some(pattern => lower.includes(pattern));
        
        if (isJunk) {
            filesToRemove.push(filename);
        } else if (!zip.files[filename].dir) {
            filesToKeep.push(filename);
        }
    });
    
    const newZip = new JSZip();
    for (const filename of filesToKeep) {
        const zipFile = zip.file(filename);
        if (zipFile && !zipFile.dir) {
            const fileData = await zipFile.async('arraybuffer');
            newZip.file(filename, fileData);
        }
    }
    
    const cleanedBlob = await newZip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE'
    });
    
    return {
        blob: cleanedBlob,
        removedCount: filesToRemove.length,
        originalSize: file.size,
        cleanedSize: cleanedBlob.size
    };
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Load static packs
function loadPacks() {
    const grid = document.getElementById('packsGrid');
    grid.innerHTML = '';
    
    STATIC_PACKS.forEach((pack, index) => {
        const card = document.createElement('div');
        card.className = 'pack-card';
        card.innerHTML = `
            <div class="pack-header">
                <h3 class="pack-title">${pack.name}</h3>
                <p class="pack-description">${pack.description}</p>
            </div>
            <div class="pack-tags">
                ${pack.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="pack-stats">
                <span>⬇️ ${pack.downloads}</span>
            </div>
            <div class="pack-actions">
                <button class="btn btn-primary" onclick="downloadPack(${index})">Download</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Download pack
function downloadPack(index) {
    const pack = STATIC_PACKS[index];
    window.open(pack.url, '_blank');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load packs
    loadPacks();
    
    // Cleaner functionality
    const cleanerDropZone = document.getElementById('cleanerDropZone');
    const cleanerFileInput = document.getElementById('cleanerFileInput');
    const cleanBtn = document.getElementById('cleanBtn');
    
    cleanerDropZone.addEventListener('click', () => cleanerFileInput.click());
    
    cleanerDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        cleanerDropZone.classList.add('dragover');
    });
    
    cleanerDropZone.addEventListener('dragleave', () => {
        cleanerDropZone.classList.remove('dragover');
    });
    
    cleanerDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        cleanerDropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            currentFile = e.dataTransfer.files[0];
            document.getElementById('cleanerFileName').textContent = currentFile.name;
            cleanBtn.disabled = false;
        }
    });
    
    cleanerFileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            currentFile = e.target.files[0];
            document.getElementById('cleanerFileName').textContent = currentFile.name;
            cleanBtn.disabled = false;
        }
    });
    
    cleanBtn.addEventListener('click', async () => {
        if (!currentFile) return;
        
        cleanBtn.textContent = 'Cleaning...';
        cleanBtn.disabled = true;
        
        try {
            const result = await cleanPack(currentFile);
            cleanedPackBlob = result.blob;
            
            document.getElementById('removedFiles').textContent = result.removedCount;
            const savings = ((result.originalSize - result.cleanedSize) / result.originalSize * 100).toFixed(1);
            document.getElementById('sizeSaved').textContent = savings + '%';
            document.getElementById('cleanerResults').style.display = 'block';
        } catch (error) {
            console.error('Clean error:', error);
            alert('Error cleaning pack: ' + error.message);
        }
        
        cleanBtn.textContent = 'Clean Pack';
        cleanBtn.disabled = false;
    });
    
    document.getElementById('downloadCleanedBtn').addEventListener('click', () => {
        if (cleanedPackBlob && currentFile) {
            saveAs(cleanedPackBlob, currentFile.name.replace('.zip', '') + '_cleaned.zip');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
