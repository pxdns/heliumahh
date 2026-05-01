// ============================================
// MCLEANER - Advanced Pack Cleaner + Converter
// ============================================

// 50+ Junk File Patterns
const JUNK_PATTERNS = {
    // macOS files
    macos: [
        '.ds_store', '.ds_store?', '._*', '.appledouble', '.appledb', 
        '.appledesktop', '.apdisk', '.fseventsd', '.spotlight-v100',
        '.trashes', '.vol', '.temporaryitems', '.icloud'
    ],
    
    // Windows files
    windows: [
        'thumbs.db', 'ehthumbs.db', 'desktop.ini', 'icon?', 'icon\r',
        'folder.jpg', 'folder.gif', 'folder.bmp', 'recycle',
        'system volume information', 'desktop.ini', 'ntuser.dat'
    ],
    
    // Version control
    vcs: [
        '.git/', '.gitattributes', '.gitignore', '.gitmodules',
        '.svn/', '.hg/', '.bzr/', '.cvs/', '.cvsignore',
        'commit-msg', 'pre-commit', 'post-commit'
    ],
    
    // IDE/Editor
    ide: [
        '.idea/', '.vscode/', '.sublime-project', '.sublime-workspace',
        '.atom/', '.brackets.json', '.zed/', '.cursor/',
        '.project', '.classpath', '.settings/', '.metadata/',
        '.eclipse/', '.nbproject/', '.iml', '.ipr', '.iws'
    ],
    
    // Build/Compilation
    build: [
        '.gradle/', 'gradle/', 'build/', 'out/', 'bin/', 'obj/',
        'target/', 'dist/', 'node_modules/', '.next/', '.nuxt/',
        '__pycache__/', '*.pyc', '*.pyo', '*.class', '*.o', '*.obj',
        '.webpack/', '.parcel-cache/', '.turbo/'
    ],
    
    // Source files (shouldn't be in packs)
    source: [
        '.java', '.py', '.cpp', '.c', '.h', '.hpp', '.cs', '.go',
        '.rs', '.swift', '.kt', '.scala', '.groovy', '.rb', '.php',
        '.pl', '.lua', '.sh', '.bat', '.cmd', '.ps1', '.vbs',
        '.coffee', '.ts', '.tsx', '.jsx', '.vue', '.svelte'
    ],
    
    // Design files
    design: [
        '.psd', '.ai', '.eps', '.indd', '.idml', '.psb',
        '.sketch', '.fig', '.xd', '.axd', '.prproj', '.aep',
        '.blend', '.blend1', '.blend2', '.ma', '.mb', '.max',
        '.3ds', '.c4d', '.fbx', '.obj', '.mtl', '.dae', '.stl'
    ],
    
    // Dev/Config files
    dev: [
        'dockerfile', 'docker-compose.yml', 'docker-compose.yaml',
        '.dockerignore', 'makefile', 'makefile.am', 'makefile.in',
        'cmakelists.txt', '.cmake', '.gradle', 'pom.xml', 'build.gradle',
        'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
        '.npmignore', '.npmrc', 'tsconfig.json', 'jsconfig.json',
        '.babelrc', '.eslintrc', '.eslintignore', '.prettierrc',
        '.editorconfig', '.flowconfig', '.stylelintrc', '.stylelintignore'
    ],
    
    // Logs and temp
    logs: [
        '*.log', '*.tmp', '*.temp', '*.swp', '*.swo', '*~', '.swp',
        '.swo', '.bak', '.backup', '.old', '.orig', '.rej', '.diff',
        '.patch', '.err', '.error', '.crash', '.dump', '.stackdump'
    ],
    
    // Cache files
    cache: [
        '.cache/', '__pycache__/', '.sass-cache/', '.eslintcache',
        '.parcel-cache/', '.turbo/', '.nyc_output/', '.coverage/',
        '.hypothesis/', '.mypy_cache/', '.pytest_cache/', '.tox/',
        '*.js.map', '*.css.map', '*.ts.map', '*.min.map'
    ],
    
    // Documentation
    docs: [
        'readme.md', 'readme.txt', 'readme', 'changelog', 'changes',
        'license', 'license.txt', 'copying', 'authors', 'contributors',
        'install', 'install.md', 'install.txt', 'uninstall',
        'todo', 'todo.txt', 'notes', 'notes.txt'
    ],
    
    // Other unnecessary
    other: [
        '.github/', '.gitlab-ci.yml', '.travis.yml', '.circleci/',
        'appveyor.yml', 'azure-pipelines.yml', 'jenkinsfile',
        '.codeclimate.yml', '.codecov.yml', '.coveralls.yml',
        '.scrutinizer.yml', '.snyk', '.sonarcloud.properties',
        '.dependabot.yml', '.renovaterc.json', '.pre-commit-config.yaml'
    ]
};

// All patterns flattened
const ALL_JUNK_PATTERNS = Object.values(JUNK_PATTERNS).flat();

// Minecraft Version Pack Formats
const MC_VERSIONS = {
    '1.8.9': { format: 2, description: '1.8.9 - 1.12.2' },
    '1.9': { format: 2, description: '1.9 - 1.12.2' },
    '1.10': { format: 2, description: '1.10 - 1.12.2' },
    '1.11': { format: 2, description: '1.11 - 1.12.2' },
    '1.12': { format: 2, description: '1.12 - 1.12.2' },
    '1.13': { format: 4, description: '1.13 - 1.14.4' },
    '1.14': { format: 4, description: '1.14 - 1.14.4' },
    '1.15': { format: 5, description: '1.15 - 1.16.1' },
    '1.16': { format: 5, description: '1.16 - 1.16.1' },
    '1.16.2': { format: 5, description: '1.16.2 - 1.16.5' },
    '1.17': { format: 7, description: '1.17 - 1.17.1' },
    '1.18': { format: 8, description: '1.18 - 1.18.2' },
    '1.19': { format: 9, description: '1.19 - 1.19.2' },
    '1.19.3': { format: 13, description: '1.19.3 - 1.19.4' },
    '1.20': { format: 15, description: '1.20 - 1.20.4' },
    '1.20.5': { format: 16, description: '1.20.5 - 1.20.6' },
    '1.21': { format: 34, description: '1.21 - 1.21.1' },
    '1.21.2': { format: 42, description: '1.21.2 - 1.21.4' },
    '1.21.4': { format: 42, description: '1.21.4' }
};

// State
let cleanerFile = null;
let converterFile = null;
let cleanedPackBlob = null;
let convertedPackBlob = null;
let removedFilesList = [];

// ============================================
// CLEANER FUNCTIONS
// ============================================

function isJunkFile(filename, aggressive = false) {
    const lowerName = filename.toLowerCase();
    
    // Check against all patterns
    for (const pattern of ALL_JUNK_PATTERNS) {
        if (pattern.includes('*')) {
            // Wildcard pattern
            const regex = new RegExp(pattern.replace(/\*/g, '.*'));
            if (regex.test(lowerName)) return true;
        } else if (lowerName.includes(pattern)) {
            return true;
        }
    }
    
    // Aggressive mode - additional checks
    if (aggressive) {
        // Remove hidden files (starting with .)
        if (filename.startsWith('.') && !filename.startsWith('..')) return true;
        
        // Remove backup files
        if (/\.\d+$/.test(filename) || filename.includes('.backup')) return true;
        
        // Remove files with suspicious extensions
        const suspicious = ['.old', '.orig', '.bkp', '.sav', '.save'];
        if (suspicious.some(ext => lowerName.endsWith(ext))) return true;
    }
    
    return false;
}

async function cleanPack(file, aggressive = false) {
    const zip = await JSZip.loadAsync(file);
    
    const filesToRemove = [];
    const filesToKeep = [];
    
    Object.keys(zip.files).forEach(filename => {
        const zipFile = zip.files[filename];
        
        if (zipFile.dir) {
            // Check if directory should be removed
            if (isJunkFile(filename + '/', aggressive)) {
                filesToRemove.push(filename);
            }
        } else {
            // Check if file should be removed
            if (isJunkFile(filename, aggressive)) {
                filesToRemove.push(filename);
            } else {
                filesToKeep.push(filename);
            }
        }
    });
    
    // Create new zip with only kept files
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
        compression: 'DEFLATE',
        compressionOptions: { level: 9 }
    });
    
    return {
        blob: cleanedBlob,
        removedCount: filesToRemove.length,
        removedFiles: filesToRemove,
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

// ============================================
// CONVERTER FUNCTIONS
// ============================================

async function convertPack(file, targetVersion) {
    const zip = await JSZip.loadAsync(file);
    const versionInfo = MC_VERSIONS[targetVersion] || MC_VERSIONS['1.20'];
    const packFormat = versionInfo.format;
    
    // Update or create pack.mcmeta
    let packMcmeta = zip.file('pack.mcmeta');
    let mcmeta = {};
    
    if (packMcmeta) {
        try {
            const content = await packMcmeta.async('string');
            mcmeta = JSON.parse(content);
        } catch (e) {
            console.error('Error parsing pack.mcmeta:', e);
        }
    }
    
    // Update pack format
    if (!mcmeta.pack) {
        mcmeta.pack = {};
    }
    mcmeta.pack.pack_format = packFormat;
    
    // Add description if missing
    if (!mcmeta.pack.description) {
        mcmeta.pack.description = `Converted for ${targetVersion}`;
    }
    
    // Write updated pack.mcmeta
    zip.file('pack.mcmeta', JSON.stringify(mcmeta, null, 2));
    
    // Generate converted pack
    const convertedBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 }
    });
    
    return {
        blob: convertedBlob,
        version: targetVersion,
        format: packFormat,
        description: versionInfo.description
    };
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== CLEANER ==========
    const cleanerDropZone = document.getElementById('cleanerDropZone');
    const cleanerFileInput = document.getElementById('cleanerFileInput');
    const cleanBtn = document.getElementById('cleanBtn');
    const aggressiveMode = document.getElementById('aggressiveMode');
    
    // Drop zone events
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
            cleanerFile = e.dataTransfer.files[0];
            document.getElementById('cleanerFileName').textContent = cleanerFile.name;
            cleanBtn.disabled = false;
        }
    });
    
    cleanerFileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            cleanerFile = e.target.files[0];
            document.getElementById('cleanerFileName').textContent = cleanerFile.name;
            cleanBtn.disabled = false;
        }
    });
    
    // Clean button
    cleanBtn.addEventListener('click', async () => {
        if (!cleanerFile) return;
        
        cleanBtn.textContent = 'Cleaning...';
        cleanBtn.disabled = true;
        
        try {
            const isAggressive = aggressiveMode.checked;
            const result = await cleanPack(cleanerFile, isAggressive);
            
            cleanedPackBlob = result.blob;
            removedFilesList = result.removedFiles;
            
            // Update results
            document.getElementById('removedFiles').textContent = result.removedCount;
            document.getElementById('sizeBefore').textContent = formatBytes(result.originalSize);
            document.getElementById('sizeAfter').textContent = formatBytes(result.cleanedSize);
            
            const savings = ((result.originalSize - result.cleanedSize) / result.originalSize * 100).toFixed(1);
            document.getElementById('sizeSaved').textContent = savings + '%';
            
            // Show removed files list
            const removedList = document.getElementById('removedList');
            if (result.removedFiles.length > 0) {
                removedList.innerHTML = `
                    <h4>Removed Files (${result.removedFiles.length}):</h4>
                    <ul>
                        ${result.removedFiles.slice(0, 20).map(f => `<li>${f}</li>`).join('')}
                        ${result.removedFiles.length > 20 ? `<li>... and ${result.removedFiles.length - 20} more</li>` : ''}
                    </ul>
                `;
            } else {
                removedList.innerHTML = '<p>No junk files found - pack is already clean!</p>';
            }
            
            document.getElementById('cleanerResults').style.display = 'block';
            
        } catch (error) {
            console.error('Clean error:', error);
            alert('Error cleaning pack: ' + error.message);
        }
        
        cleanBtn.innerHTML = 'Clean Pack';
        cleanBtn.disabled = false;
    });
    
    // Download cleaned
    document.getElementById('downloadCleanedBtn').addEventListener('click', () => {
        if (cleanedPackBlob && cleanerFile) {
            const newName = cleanerFile.name.replace('.zip', '') + '_cleaned.zip';
            saveAs(cleanedPackBlob, newName);
        }
    });
    
    // ========== CONVERTER ==========
    const converterDropZone = document.getElementById('converterDropZone');
    const converterFileInput = document.getElementById('converterFileInput');
    const convertBtn = document.getElementById('convertBtn');
    const targetVersion = document.getElementById('targetVersion');
    
    // Drop zone events
    converterDropZone.addEventListener('click', () => converterFileInput.click());
    
    converterDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        converterDropZone.classList.add('dragover');
    });
    
    converterDropZone.addEventListener('dragleave', () => {
        converterDropZone.classList.remove('dragover');
    });
    
    converterDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        converterDropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            converterFile = e.dataTransfer.files[0];
            document.getElementById('converterFileName').textContent = converterFile.name;
            convertBtn.disabled = false;
        }
    });
    
    converterFileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            converterFile = e.target.files[0];
            document.getElementById('converterFileName').textContent = converterFile.name;
            convertBtn.disabled = false;
        }
    });
    
    // Convert button
    convertBtn.addEventListener('click', async () => {
        if (!converterFile) return;
        
        convertBtn.textContent = 'Converting...';
        convertBtn.disabled = true;
        
        try {
            const version = targetVersion.value;
            const result = await convertPack(converterFile, version);
            
            convertedPackBlob = result.blob;
            
            document.getElementById('convertedVersion').textContent = version;
            document.getElementById('packFormat').textContent = result.format;
            document.getElementById('converterResults').style.display = 'block';
            
        } catch (error) {
            console.error('Convert error:', error);
            alert('Error converting pack: ' + error.message);
        }
        
        convertBtn.innerHTML = 'Convert Pack';
        convertBtn.disabled = false;
    });
    
    // Download converted
    document.getElementById('downloadConvertedBtn').addEventListener('click', () => {
        if (convertedPackBlob && converterFile) {
            const version = targetVersion.value;
            const newName = converterFile.name.replace('.zip', '') + '_' + version + '.zip';
            saveAs(convertedPackBlob, newName);
        }
    });
    
    // ========== PACK.MCMETA UPDATER ==========
    const mcmetaDropZone = document.getElementById('mcmetaDropZone');
    const mcmetaFileInput = document.getElementById('mcmetaFileInput');
    const updateMcmetaBtn = document.getElementById('updateMcmetaBtn');
    let mcmetaFile = null;
    let updatedMcmetaBlob = null;
    
    // Drop zone events
    mcmetaDropZone.addEventListener('click', () => mcmetaFileInput.click());
    
    mcmetaDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        mcmetaDropZone.classList.add('dragover');
    });
    
    mcmetaDropZone.addEventListener('dragleave', () => {
        mcmetaDropZone.classList.remove('dragover');
    });
    
    mcmetaDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        mcmetaDropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            mcmetaFile = e.dataTransfer.files[0];
            document.getElementById('mcmetaFileName').textContent = mcmetaFile.name;
            updateMcmetaBtn.disabled = false;
        }
    });
    
    mcmetaFileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            mcmetaFile = e.target.files[0];
            document.getElementById('mcmetaFileName').textContent = mcmetaFile.name;
            updateMcmetaBtn.disabled = false;
        }
    });
    
    // Update button
    updateMcmetaBtn.addEventListener('click', async () => {
        if (!mcmetaFile) return;
        
        updateMcmetaBtn.textContent = 'Updating...';
        updateMcmetaBtn.disabled = true;
        
        try {
            const format = parseInt(document.getElementById('mcmetaFormat').value);
            
            // Load the zip
            const zip = await JSZip.loadAsync(mcmetaFile);
            
            // Find and update pack.mcmeta
            let packMcmeta = zip.file('pack.mcmeta');
            let mcmeta = {};
            
            if (packMcmeta) {
                try {
                    const content = await packMcmeta.async('string');
                    mcmeta = JSON.parse(content);
                } catch (e) {
                    console.error('Error parsing pack.mcmeta:', e);
                    mcmeta = { pack: {} };
                }
            } else {
                // Create new pack.mcmeta if it doesn't exist
                mcmeta = { pack: {} };
            }
            
            // Update ONLY the pack_format
            if (!mcmeta.pack) {
                mcmeta.pack = {};
            }
            mcmeta.pack.pack_format = format;
            
            // If no description exists, add a default one
            if (!mcmeta.pack.description) {
                mcmeta.pack.description = 'Minecraft Resource Pack';
            }
            
            // Write updated pack.mcmeta back to zip
            zip.file('pack.mcmeta', JSON.stringify(mcmeta, null, 2));
            
            // Generate updated pack
            updatedMcmetaBlob = await zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
                compressionOptions: { level: 9 }
            });
            
            document.getElementById('updatedFormat').textContent = format;
            document.getElementById('mcmetaResults').style.display = 'block';
            
        } catch (error) {
            console.error('Update error:', error);
            alert('Error updating pack: ' + error.message);
        }
        
        updateMcmetaBtn.innerHTML = 'Update Pack Format';
        updateMcmetaBtn.disabled = false;
    });
    
    // Download updated pack
    document.getElementById('downloadUpdatedBtn').addEventListener('click', () => {
        if (updatedMcmetaBlob && mcmetaFile) {
            const newName = mcmetaFile.name.replace('.zip', '') + '_updated.zip';
            saveAs(updatedMcmetaBlob, newName);
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
