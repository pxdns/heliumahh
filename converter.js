// ============================================
// CONVERTER - Version Converter + Mcmeta Editor
// ============================================

// Minecraft Version Pack Formats
const MC_VERSIONS = {
    '1.8.9':  { format: 2,  description: '1.8.9 - 1.12.2' },
    '1.9':    { format: 2,  description: '1.9 - 1.12.2' },
    '1.10':   { format: 2,  description: '1.10 - 1.12.2' },
    '1.11':   { format: 2,  description: '1.11 - 1.12.2' },
    '1.12':   { format: 2,  description: '1.12 - 1.12.2' },
    '1.13':   { format: 4,  description: '1.13 - 1.14.4' },
    '1.14':   { format: 4,  description: '1.14 - 1.14.4' },
    '1.15':   { format: 5,  description: '1.15 - 1.16.1' },
    '1.16':   { format: 5,  description: '1.16 - 1.16.1' },
    '1.16.2': { format: 6,  description: '1.16.2 - 1.16.5' },
    '1.17':   { format: 7,  description: '1.17 - 1.17.1' },
    '1.18':   { format: 8,  description: '1.18 - 1.18.2' },
    '1.19':   { format: 9,  description: '1.19 - 1.19.2' },
    '1.19.3': { format: 13, description: '1.19.3 - 1.19.4' },
    '1.20':   { format: 15, description: '1.20 - 1.20.4' },
    '1.20.5': { format: 16, description: '1.20.5 - 1.20.6' },
    '1.21':   { format: 34, description: '1.21 - 1.21.1' },
    '1.21.2': { format: 42, description: '1.21.2 - 1.21.4' },
    '1.21.4': { format: 42, description: '1.21.4' }
};

// State
let converterFile = null;
let convertedPackBlob = null;
let mcmetaFile = null;
let updatedMcmetaBlob = null;

// ============================================
// CONVERTER FUNCTIONS
// ============================================

async function convertPack(file, targetVersion) {
    const zip = await JSZip.loadAsync(file);
    const versionInfo = MC_VERSIONS[targetVersion] || MC_VERSIONS['1.20'];
    const packFormat = versionInfo.format;

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

    if (!mcmeta.pack) mcmeta.pack = {};
    mcmeta.pack.pack_format = packFormat;

    if (!mcmeta.pack.description) {
        mcmeta.pack.description = `Converted for ${targetVersion}`;
    }

    zip.file('pack.mcmeta', JSON.stringify(mcmeta, null, 2));

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

async function updateMcmeta(file, format) {
    const zip = await JSZip.loadAsync(file);

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
        mcmeta = { pack: {} };
    }

    if (!mcmeta.pack) mcmeta.pack = {};
    mcmeta.pack.pack_format = format;

    if (!mcmeta.pack.description) {
        mcmeta.pack.description = 'Minecraft Resource Pack';
    }

    zip.file('pack.mcmeta', JSON.stringify(mcmeta, null, 2));

    const updatedBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 }
    });

    return { blob: updatedBlob, format };
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ========== VERSION CONVERTER ==========
    const converterDropZone = document.getElementById('converterDropZone');
    const converterFileInput = document.getElementById('converterFileInput');
    const convertBtn = document.getElementById('convertBtn');
    const targetVersion = document.getElementById('targetVersion');

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

        convertBtn.textContent = 'Convert';
        convertBtn.disabled = false;
    });

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

    updateMcmetaBtn.addEventListener('click', async () => {
        if (!mcmetaFile) return;

        updateMcmetaBtn.textContent = 'Updating...';
        updateMcmetaBtn.disabled = true;

        try {
            const format = parseInt(document.getElementById('mcmetaFormat').value);
            const result = await updateMcmeta(mcmetaFile, format);

            updatedMcmetaBlob = result.blob;
            document.getElementById('updatedFormat').textContent = format;
            document.getElementById('mcmetaResults').style.display = 'block';
        } catch (error) {
            console.error('Update error:', error);
            alert('Error updating pack: ' + error.message);
        }

        updateMcmetaBtn.textContent = 'Update Pack Format';
        updateMcmetaBtn.disabled = false;
    });

    document.getElementById('downloadUpdatedBtn').addEventListener('click', () => {
        if (updatedMcmetaBlob && mcmetaFile) {
            const newName = mcmetaFile.name.replace('.zip', '') + '_updated.zip';
            saveAs(updatedMcmetaBlob, newName);
        }
    });
});
